
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserDetailsById } from './UserReportSlice';

// const UserReport = () => {
//   const dispatch = useDispatch();
//   const storedToken = localStorage.getItem('token');
//   const [usernames, setUsernames] = useState({});
//   const [loading, setLoading] = useState(true);

//   // Extract userId from the stored token
//   const userId = storedToken ? JSON.parse(atob(storedToken.split('.')[1])).UserId : null;
//   console.log('getdata:', userId);
//   const report = useSelector((state) => state.userReport.userDetails);
//   const status = useSelector((state) => state.userReport.status);
//   const error = useSelector((state) => state.userReport.error);

//   const fetchUsernameById = async (userId) => {
//     try {
//       const response = await fetch(`https://localhost:44356/api/User/GetUserType?Id=${userId}`);
//       const data = await response.json();

//       if (response.ok) {
//         return data.username;
//       } else {
//         console.error(`Error fetching username for user ID ${userId}: ${data.message}`);
//         return 'N/A';
//       }
//     } catch (error) {
//       console.error(`Error fetching username for user ID ${userId}: ${error.message}`);
//       return 'N/A';
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (storedToken && loading) {
//           console.log('Dispatching fetchUserDetailsById...');
//           const action = fetchUserDetailsById();
//           await dispatch(action);
//           console.log('Dispatched fetchUserDetailsById.');
//           console.log('Report after dispatch:', report);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchData();
//   }, [dispatch, storedToken, loading, report]);
  

//   useEffect(() => {
//     const updateUsernameData = async () => {
//       try {
//         console.log('Report in updateUsernameData:', report); // Log the report here
//         if (report && report.userId) {
//           const uniqueUserIds = [report.userId];

//           if (Object.keys(usernames).length !== uniqueUserIds.length) {
//             console.log('Fetching usernames...');
//             const usernamesMap = {};
//             for (const userId of uniqueUserIds) {
//               const username = await fetchUsernameById(userId);
//               usernamesMap[userId] = username;
//             }

//             setUsernames(usernamesMap);
//           }
//         }
//       } catch (error) {
//         console.error('Error updating username data:', error.message);
//       }
//     };

//     updateUsernameData();
//   }, [report, usernames]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (report && report.length > 0) {
//     const userReport = report[0]; 
  
//     return (
//       <div>
//         <h2>User Report</h2>
       
//         <p>User Name: {userReport.userName}</p>
//         <h2>Date</h2>
//         <p>Date : {userReport.date}</p>
//         <h2>Times</h2>
//         <p>Clock In Times: {JSON.stringify(userReport.clockInTimes)}</p>
//         <p>Clock Out Times: {JSON.stringify(userReport.clockOutTimes)}</p>
//         <p>Start Break Times: {JSON.stringify(userReport.startBreakTimes)}</p>
//         <p>Finish Break Times: {JSON.stringify(userReport.finishBreakTimes)}</p>
//         <h2>Hours</h2>
//         <p>Total Productive Hours: {userReport.totalProductiveHours}</p>
//         <p>Total Hours: {userReport.totalHours}</p>
//       </div>
//     );
//   }
  

 
// };

// export default UserReport;
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

  // Extract userId from the stored token
  const userId = storedToken ? JSON.parse(atob(storedToken.split('.')[1])).UserId : null;
  const report = useSelector((state) => state.userReport.userDetails);
  const status = useSelector((state) => state.userReport.status);
  const error = useSelector((state) => state.userReport.error);

  const fetchUsernameById = async (userId) => {
    try {
      const response = await fetch(`https://localhost:44356/api/User/GetUserType?Id=${userId}`);
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
