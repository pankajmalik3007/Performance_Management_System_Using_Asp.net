import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { insertEvent, fetchAllEvents, deleteEventById } from './EventInsertSlice';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Modal, Backdrop, Fade } from '@mui/material';
import './EventInsertComponent.css';

const EventInsertComponent = () => {
  const dispatch = useDispatch();
  const [eventData, setEventData] = useState({
    eventName: '',
    eventType: '',
    eventDateTime: new Date().toISOString(),
    dateTime: new Date().toISOString(),
    username: '',
    mentor: '',
  });

  const status = useSelector((state) => state.eventInsert.status);
  const error = useSelector((state) => state.eventInsert.error);
  const allEvents = useSelector((state) => state.eventInsert.allEvents);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(insertEvent(eventData));
    handleClose();
  };

  const handleDelete = (eventId) => {
    dispatch(deleteEventById(eventId));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h2>Insert Event</h2>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Insert Event
      </Button>

      {open && (
        <div className="modal-backdrop">
          <div className="modal-container">
            <div className="modal-content">
              <h2>Insert Event</h2>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Event Name"
                  type="text"
                  name="eventName"
                  value={eventData.eventName}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Event Type"
                  type="text"
                  name="eventType"
                  value={eventData.eventType}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Event Date and Time"
                  type="datetime-local"
                  name="eventDateTime"
                  value={eventData.eventDateTime}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Username"
                  type="text"
                  name="username"
                  value={eventData.username}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Mentor"
                  type="text"
                  name="mentor"
                  value={eventData.mentor}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" disabled={status === 'loading'} fullWidth>
                  Insert Event
                </Button>
                {status === 'failed' && <div>Error: {error}</div>}
              </form>
            </div>
          </div>
        </div>
      )}

      <h2>All Events</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Event Name</TableCell>
              <TableCell>Event Type</TableCell>
              <TableCell>Event Date and Time</TableCell>
              <TableCell>Event Insert Time</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Mentor</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.eventName}</TableCell>
                <TableCell>{event.eventType}</TableCell>
                <TableCell>{event.eventDateTime}</TableCell>
                <TableCell>{event.dateTime}</TableCell>
                <TableCell>{event.username}</TableCell>
                <TableCell>{event.mentor}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(event.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EventInsertComponent;
