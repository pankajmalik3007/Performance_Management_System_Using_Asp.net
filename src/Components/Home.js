

// export default Home;
// import React from 'react';
// import { Link as RouterLink, Outlet } from 'react-router-dom';
// import { AppBar, Toolbar, Typography, Button } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { useAuth } from '../Components/AuthContext';
// import { CLOCK_IN_API, CLOCK_OUT_API } from './TimeManagement/Constant';
// import {
//   clockInStart,
//   clockInSuccess,
//   clockOutStart,
//   clockOutSuccess,
//   clockFailure,
// } from '../Components/TimeManagement/ClockInOutSlice';
// import { Start_Break, Finish_Break } from '../Components/TimeManagement/Constant';
// import AlarmAddIcon from '@mui/icons-material/AlarmAdd';
// import AlarmOffIcon from '@mui/icons-material/AlarmOff';

// import {
//   startBreakStart,
//   startBreakSuccess,
//   finishBreakStart,
//   finishBreakSuccess,
//   breakFailure,
// } from '../Components/TimeManagement/StartFinishBreakSlice';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import TimerOffIcon from '@mui/icons-material/TimerOff';

// const getToken = () => {
//   return localStorage.getItem('token');
// };

// const Home = () => {
//   const dispatch = useDispatch();
//   const { user } = useAuth();
//   const { isClockedIn = false, isLoading: clockInOutLoading, error: clockInOutError } = useSelector((state) => state.clockInOut) || {};
//   const { isBreakStarted = false, isLoading: startFinishLoading, error: startFinishError } = useSelector((state) => state.startFinishBreak) || {};

//   const handleClockInOut = async () => {
//     dispatch(isClockedIn ? clockOutStart() : clockInStart());

//     try {
//       const token = getToken();
//       const userId = await JSON.parse(atob(token.split('.')[1])).UserId;

//       // Assuming CLOCK_IN_API and CLOCK_OUT_API are defined in ClockInOutSlice
//       const response = await fetch(
//         isClockedIn ? CLOCK_OUT_API : CLOCK_IN_API,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ UserId: userId }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error('Failed to clock ' + (isClockedIn ? 'out' : 'in'));
//       }

//       dispatch(isClockedIn ? clockOutSuccess() : clockInSuccess());
//     } catch (error) {
//       dispatch(clockFailure(error.message));
//     }
//   };

//   const handleStartFinishBreak = async () => {
//     dispatch(isBreakStarted ? finishBreakStart() : startBreakStart());

//     try {
//       const token = getToken();
//       const userId = await JSON.parse(atob(token.split('.')[1])).UserId;

//       const response = await fetch(
//         isBreakStarted ? Finish_Break : Start_Break,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ UserId: userId }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error('Failed to ' + (isBreakStarted ? 'finish break' : 'start break'));
//       }

//       dispatch(isBreakStarted ? finishBreakSuccess() : startBreakSuccess());
//     } catch (error) {
//       dispatch(breakFailure(error.message));
//     }
//   };

//   return (
//     <div>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" component={RouterLink} to="/" style={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
//             Home Page
//           </Typography>
//           <Button color="inherit" component={RouterLink} to="/Home">
//             Home
//           </Button>
//           <Button color="inherit" component={RouterLink} to="/Home/leaveapp" style={{ textDecoration: 'none', color: 'inherit', marginLeft: 16 }}>
//             Leave App
//           </Button>
//           <Button color="inherit" component={RouterLink} to="/Home/leavestatus" style={{ textDecoration: 'none', color: 'inherit', marginLeft: 16 }}>
//             Leave Status App
//           </Button>
//           <Button color="inherit" component={RouterLink} to="/Home/leavehistory" style={{ textDecoration: 'none', color: 'inherit', marginLeft: 16 }}>
//             Leave History
//           </Button>

//           {/* ClockInOut Button */}
//           <Button color="inherit" onClick={handleClockInOut} disabled={clockInOutLoading} style={{ marginLeft: 16 }}>
//             {isClockedIn ? <AlarmOffIcon /> : <AlarmAddIcon />}
//           </Button>

//           {/* StartFinishBreak Button */}
//           <Button color="inherit" onClick={handleStartFinishBreak} disabled={startFinishLoading} style={{ marginLeft: 16 }}>
//             {isBreakStarted ? <TimerOffIcon /> : <AccessTimeIcon />}
//           </Button>
//         </Toolbar>
//       </AppBar>
//       <Outlet />
//     </div>
//   );
// };

// export default Home;
import React, { useState } from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
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
import AlarmAddIcon from '@mui/icons-material/AlarmAdd';
import AlarmOffIcon from '@mui/icons-material/AlarmOff';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TimerOffIcon from '@mui/icons-material/TimerOff';

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
  const { isClockedIn = false, isLoading: clockInOutLoading, error: clockInOutError } = useSelector((state) => state.clockInOut) || {};
  const { isBreakStarted = false, isLoading: startFinishLoading, error: startFinishError } = useSelector((state) => state.startFinishBreak) || {};

  const [clockInClicked, setClockInClicked] = useState(false);

  const handleClockInOut = async () => {
    setClockInClicked(true);
    dispatch(isClockedIn ? clockOutStart() : clockInStart());

    try {
      const token = getToken();
      const userId = await JSON.parse(atob(token.split('.')[1])).UserId;

      // Assuming CLOCK_IN_API and CLOCK_OUT_API are defined in ClockInOutSlice
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
          <Typography variant="h6" component={RouterLink} to="/" style={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            Home Page
          </Typography>
          <Button color="inherit" component={RouterLink} to="/Home">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/Home/leaveapp" style={{ textDecoration: 'none', color: 'inherit', marginLeft: 16 }}>
            Leave App
          </Button>
          <Button color="inherit" component={RouterLink} to="/Home/leavestatus" style={{ textDecoration: 'none', color: 'inherit', marginLeft: 16 }}>
            Leave Status App
          </Button>
          <Button color="inherit" component={RouterLink} to="/Home/leavehistory" style={{ textDecoration: 'none', color: 'inherit', marginLeft: 16 }}>
            Leave History
          </Button>

          {/* ClockInOut Button */}
          <Button color="inherit" onClick={handleClockInOut} disabled={clockInOutLoading} style={{ marginLeft: 16 }}>
            {isClockedIn ? <AlarmOffIcon /> : <AlarmAddIcon />}
          </Button>

          {/* StartFinishBreak Button */}
          {clockInClicked && (
            <>
              <Button color="inherit" onClick={handleStartFinishBreak} disabled={startFinishLoading} style={{ marginLeft: 16 }}>
                {isBreakStarted ? <TimerOffIcon /> : <AccessTimeIcon />}
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
};

export default Home;
