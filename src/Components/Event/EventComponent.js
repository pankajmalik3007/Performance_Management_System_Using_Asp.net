import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEventsByUserId } from './EventSlice';
import { useAuth } from '../AuthContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './event.css'
const EventComponent = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const storedToken = localStorage.getItem('token');
  const events = useSelector((state) => state.event.events);
  const status = useSelector((state) => state.event.status);
  const error = useSelector((state) => state.event.error);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (storedToken) {
          await dispatch(getEventsByUserId());
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [dispatch, storedToken]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>My Events</h2>
      <TableContainer component={Paper} className="dark-table"> 
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Event Name</TableCell>
              <TableCell>Event Type</TableCell>
              <TableCell>Date Time</TableCell>
              <TableCell>Event Date Time</TableCell>
              <TableCell>Mentor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.eventName}</TableCell>
                <TableCell>{event.eventtype}</TableCell>
                <TableCell>{event.dateTime}</TableCell>
                <TableCell>{event.eventDateTime}</TableCell>
                <TableCell>{event.mentor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EventComponent;