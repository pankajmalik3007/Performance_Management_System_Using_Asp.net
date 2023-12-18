
import React, { useState } from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  AlarmAdd as AlarmAddIcon,
  AlarmOff as AlarmOffIcon,
  AccessTime as AccessTimeIcon,
  TimerOff as TimerOffIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import { useAuth } from '../Components/AuthContext';
import { CLOCK_IN_API, CLOCK_OUT_API } from './TimeManagement/Constant';
import {
  clockInStart,
  clockInSuccess,
  clockOutStart,
  clockOutSuccess,
  clockFailure,
} from '../Components/TimeManagement/ClockInOutSlice';
import { Start_Break, Finish_Break } from '../Components/TimeManagement/Constant';

import {
  startBreakStart,
  startBreakSuccess,
  finishBreakStart,
  finishBreakSuccess,
  breakFailure,
} from '../Components/TimeManagement/StartFinishBreakSlice';

const getToken = () => {
  return localStorage.getItem('token');
};

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const {
    isClockedIn = false,
    isLoading: clockInOutLoading,
    error: clockInOutError,
  } = useSelector((state) => state.clockInOut) || {};
  const {
    isBreakStarted = false,
    isLoading: startFinishLoading,
    error: startFinishError,
  } = useSelector((state) => state.startFinishBreak) || {};

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [clockInClicked, setClockInClicked] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleClockInOut = async () => {
    setClockInClicked(true);
    dispatch(isClockedIn ? clockOutStart() : clockInStart());

    try {
      const token = getToken();
      const userId = await JSON.parse(atob(token.split('.')[1])).UserId;

      const response = await fetch(
        isClockedIn ? CLOCK_OUT_API : CLOCK_IN_API,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ UserId: userId }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to clock ' + (isClockedIn ? 'out' : 'in'));
      }

      dispatch(isClockedIn ? clockOutSuccess() : clockInSuccess());
    } catch (error) {
      dispatch(clockFailure(error.message));
    }
  };

  const handleStartFinishBreak = async () => {
    dispatch(isBreakStarted ? finishBreakStart() : startBreakStart());

    try {
      const token = getToken();
      const userId = await JSON.parse(atob(token.split('.')[1])).UserId;

      const response = await fetch(
        isBreakStarted ? Finish_Break : Start_Break,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ UserId: userId }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to ' + (isBreakStarted ? 'finish break' : 'start break'));
      }

      dispatch(isBreakStarted ? finishBreakSuccess() : startBreakSuccess());
    } catch (error) {
      dispatch(breakFailure(error.message));
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={handleDrawerOpen}>
            Menu
          </Button>
         
          <div style={{ flexGrow: 1 }}></div>
          <Button color="inherit" onClick={handleClockInOut} disabled={clockInOutLoading}>
            {isClockedIn ? <AlarmOffIcon /> : <AlarmAddIcon />}
            {isClockedIn ? 'Clock Out' : 'Clock In'}
          </Button>
          {clockInClicked && (
            <>
              <Button color="inherit" onClick={handleStartFinishBreak} disabled={startFinishLoading}>
                {isBreakStarted ? <TimerOffIcon /> : <AccessTimeIcon />}
                {isBreakStarted ? 'Finish Break' : 'Start Break'}
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={handleDrawerClose}>
        <List>
          <ListItem button component={RouterLink} to="/Home">
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={RouterLink} to="/Home/leaveapp">
            <ListItemText primary="Apply Leave" />
          </ListItem>
          <ListItem button component={RouterLink} to="/Home/leavestatus">
            <ListItemText primary="Approved Leave(HR)" />
          </ListItem>
          <ListItem button component={RouterLink} to="/Home/leavehistory">
            <ListItemText primary="Leave History" />
          </ListItem>
          <ListItem button component={RouterLink} to="/Home/userhistory">
            <ListItemText primary="User History(HR)" />
          </ListItem>
         
          <ListItem button component={RouterLink} to="/Home/ManualRequest">
            <ListItemText primary="Insert Manual Request" />
            </ListItem>
            <ListItem button component={RouterLink} to="/Home/ShowManual">
            <ListItemText primary="Manual Request History"/>
          </ListItem>
          <ListItem button component={RouterLink} to="/Home/RequestApproval">
            <ListItemText primary="Approved Manual(HR)"/>
          </ListItem>
          <ListItem button component={RouterLink} to="/Home/Event">
            <ListItemText primary="Event History" />
          </ListItem>
          <ListItem button component={RouterLink} to="/Home/EventInsert">
            <ListItemText primary="Event Insert(HR)" />
          </ListItem>
          <ListItem button component={RouterLink} to="/Home/report">
            <ListItemText primary="User Report Card" />
          </ListItem>
        </List>
      </Drawer>
      <Outlet />
    </div>
  );
};

export default Home;