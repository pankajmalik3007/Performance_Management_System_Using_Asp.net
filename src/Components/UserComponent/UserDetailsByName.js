
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from './userSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const UserDetailsByName = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const userDetails = useSelector((state) => state.user.userDetails);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchUserDetails(userName));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          User Name:
          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
        </label>
        <button type="submit">Fetch User Details</button>
      </form>

      {userDetails && userDetails.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Clock In Times</TableCell>
                <TableCell>Clock Out Times</TableCell>
                <TableCell>Start Break Times</TableCell>
                <TableCell>Finish Break Times</TableCell>
                <TableCell>Total Productive Hours</TableCell>
                <TableCell>Total Hours</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userDetails.map((userDetail) => (
                <TableRow key={userDetail.userId}>
                  <TableCell>{userDetail.userName}</TableCell>
                  <TableCell>{userDetail.email}</TableCell>
                  <TableCell>{new Date(userDetail.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {userDetail.clockInTimes.map((time) => (
                      <span key={time}>{new Date(time).toLocaleTimeString()}, </span>
                    ))}
                  </TableCell>
                  <TableCell>
                    {userDetail.clockOutTimes.map((time) => (
                      <span key={time}>{new Date(time).toLocaleTimeString()}, </span>
                    ))}
                  </TableCell>
                  <TableCell>
                    {userDetail.startBreakTimes.map((time) => (
                      <span key={time}>{new Date(time).toLocaleTimeString()}, </span>
                    ))}
                  </TableCell>
                  <TableCell>
                    {userDetail.finishBreakTimes.map((time) => (
                      <span key={time}>{new Date(time).toLocaleTimeString()}, </span>
                    ))}
                  </TableCell>
                  <TableCell>{userDetail.totalProductiveHours}</TableCell>
                  <TableCell>{userDetail.totalHours}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default UserDetailsByName;
