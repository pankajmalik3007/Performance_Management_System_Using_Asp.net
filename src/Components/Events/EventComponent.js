import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEvents, searchEventsByName } from './EventSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';

const EventComponent = () => {
  const dispatch = useDispatch();
  const [eventName, setEventName] = useState('');
  const events = useSelector((state) => state.events.events);
  const eventsStatus = useSelector((state) => state.events.status);
  const eventsError = useSelector((state) => state.events.error);

  const handleSearch = () => {
    if (eventName.trim() !== '') {
      dispatch(searchEventsByName(eventName));
    }
  };

  const handleClearSearch = () => {
    setEventName('');
    dispatch(fetchAllEvents());
  };

  React.useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  return (
    <div>
      <TextField
        label="Search by Event Name"
        variant="outlined"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleClearSearch}>Clear Search</button>

      {eventsStatus === 'loading' && <div>Loading...</div>}
      {eventsError && <div>Error: {eventsError}</div>}

      {events.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Event Name</TableCell>
                <TableCell>Event Date Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.eventId}>
                  <TableCell>{event.eventName}</TableCell>
                  <TableCell>{event.eventDateTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default EventComponent;
