// // ClockInOut.js
// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useAuth } from '../AuthContext';
// import {
//   clockInStart,
//   clockInSuccess,
//   clockOutStart,
//   clockOutSuccess,
//   clockFailure,
// } from './ClockInOutSlice';
// import { CLOCK_IN_API, CLOCK_OUT_API } from './Constant';
// import AlarmAddIcon from '@mui/icons-material/AlarmAdd';
// import AlarmOffIcon from '@mui/icons-material/AlarmAdd';

// const getToken = () => {
//   return localStorage.getItem('token');
// };

// const ClockInOut = () => {
//   const dispatch = useDispatch();
//   const { user } = useAuth(); // Access user from the AuthContext
//   const { isClockedIn = false, isLoading, error } = useSelector((state) => state.clockInOut) || {};

//   const handleClockInOut = async () => {
//     dispatch(isClockedIn ? clockOutStart() : clockInStart());

//     try {
//       // Get the userId from the local storage token
//       const token = getToken();
//       const userId = await JSON.parse(atob(token.split('.')[1])).UserId;

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

//   return (
//     <div>
//       {/* <button onClick={handleClockInOut} disabled={isLoading}>
//         {isClockedIn ? <AlarmOffIcon /> : <AlarmAddIcon/> }
//       </button>
//       <p>{isClockedIn ? 'Clock Out' : 'Clock In'}</p>
//       {isLoading && <p>Loading...</p>}
//       {error && <p>{error}</p>} */}
//     </div>
//   );
// };

// export default ClockInOut;
