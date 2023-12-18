
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetailsById } from './UserReportSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const UserReport = () => {
  const dispatch = useDispatch();
  const storedToken = localStorage.getItem('token');
  const [loading, setLoading] = useState(true);

  
  const userId = storedToken ? JSON.parse(atob(storedToken.split('.')[1])).UserId : null;
  const report = useSelector((state) => state.userReport.userDetails);
  const status = useSelector((state) => state.userReport.status);
  const error = useSelector((state) => state.userReport.error);

  const fetchUsernameById = async (userId) => {
    try {
      const response = await fetch(`https://localhost:7189/api/User/GetUserType?Id=${userId}`);
      const data = await response.json();

      if (response.ok) {
        return data.username;
      } else {
        console.error(`Error fetching username for user ID ${userId}: ${data.message}`);
        return 'N/A';
      }
    } catch (error) {
      console.error(`Error fetching username for user ID ${userId}: ${error.message}`);
      return 'N/A';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (storedToken && loading) {
          const action = fetchUserDetailsById();
          await dispatch(action);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, storedToken, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (report && report.length > 0) {
    return (
      <div>
        <h2>User Report</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User Name</TableCell>
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
              {report.map((userReport) => (
                <TableRow key={userReport.date}>
                  <TableCell>{userReport.userName}</TableCell>
                  <TableCell>{userReport.date}</TableCell>
                  <TableCell>{userReport.clockInTimes.map(time => new Date(time).toLocaleTimeString()).join(', ')}</TableCell>
                  <TableCell>{userReport.clockOutTimes
                    .filter(time => new Date(time).toLocaleDateString() === new Date(userReport.date).toLocaleDateString())
                    .map(time => new Date(time).toLocaleTimeString()).join(', ')}</TableCell>
                  <TableCell>{userReport.startBreakTimes.map(time => new Date(time).toLocaleTimeString()).join(', ')}</TableCell>
                  <TableCell>{userReport.finishBreakTimes.map(time => new Date(time).toLocaleTimeString()).join(', ')}</TableCell>
                  <TableCell>{userReport.totalProductiveHours}</TableCell>
                  <TableCell>{userReport.totalHours}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }

  return null;
};

export default UserReport;
