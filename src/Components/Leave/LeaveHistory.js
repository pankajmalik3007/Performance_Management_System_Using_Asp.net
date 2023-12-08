// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getLeaveHistory } from './LeaveHistorySlice';
// import { useAuth } from '../AuthContext';

// const LeaveHistory = () => {
//   const dispatch = useDispatch();
//   const { user } = useAuth();
//   const storedToken = localStorage.getItem('token');
//   const [usernames, setUsernames] = useState({});
//   const [loading, setLoading] = useState(true);
//   const leaves = useSelector((state) => state.leaveHistory.history);

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
//         if (storedToken) {
//           await dispatch(getLeaveHistory()); 
          
//           const uniqueUserIds = [...new Set(leaves.map((leave) => leave.userId))];

//           const usernamesMap = {};
//           for (const userId of uniqueUserIds) {
//             const username = await fetchUsernameById(userId);
//             usernamesMap[userId] = username;
//           }

//           setUsernames(usernamesMap);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [dispatch, storedToken, leaves]);

//   const status = useSelector((state) => state.leaveHistory.status);
//   const error = useSelector((state) => state.leaveHistory.error);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (status === 'failed') {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h2>Leave History </h2>
//       <table>
//         <thead>
//           <tr>
           
//             <th>Type</th>
//             <th>Username</th>
//             <th>Reason</th>
//             <th>Leave Request Time</th>
//             <th>Start Leave Date</th>
//             <th>End Leave Date</th>
//             <th>Leave Status Time</th>
//             <th>Status</th>
           
//           </tr>
//         </thead>
//         <tbody>
//           {leaves.map((leave) => (
//             <tr key={leave.id}>
             
//               <td>{leave.leaveType}</td>
//               <td>{usernames[leave.userId] || 'N/A'}</td>
//               <td>{leave.reason}</td>
//               <td>{leave.leaveRequestTime}</td>
//               <td>{leave.startLeaveDate}</td>
//               <td>{leave.endLeaveDate}</td>
//               <td>{leave.leaveStatusTime}</td>
//               <td>{leave.status}</td>
             
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default LeaveHistory;
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getLeaveHistory, updateLeave } from './LeaveHistorySlice';
// import { useAuth } from '../AuthContext';

// const LeaveHistory = () => {
//   const dispatch = useDispatch();
//   const { user } = useAuth();
//   const storedToken = localStorage.getItem('token');
//   const [usernames, setUsernames] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [selectedLeave, setSelectedLeave] = useState(null);
//   const leaves = useSelector((state) => state.leaveHistory.history);

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

//   const handleUpdateLeave = (leave) => {
//     console.log('Selected leave:', leave);
//     setSelectedLeave(leave);
//   };

//   const handleFormSubmit = async (updatedLeaveData) => {
//     try {
//       if (selectedLeave && selectedLeave.id) {
//         const leaveId = selectedLeave.id;

//         console.log('Submitting form with leaveId:', leaveId);
//         console.log('Updated leave data:', updatedLeaveData);

//         const response = await dispatch(updateLeave({ updatedLeave: { id: leaveId, ...updatedLeaveData } }));

//         console.log('Update response:', response);

//         setSelectedLeave(null);
//       }
//     } catch (error) {
//       console.error('Error updating leave:', error);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (storedToken && loading) {
//           await dispatch(getLeaveHistory());

//           const uniqueUserIds = [...new Set(leaves.map((leave) => leave.userId))];

//           // Check if usernames have already been fetched
//           if (Object.keys(usernames).length !== uniqueUserIds.length) {
//             const usernamesMap = {};
//             for (const userId of uniqueUserIds) {
//               const username = await fetchUsernameById(userId);
//               usernamesMap[userId] = username;
//             }

//             setUsernames(usernamesMap);
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [dispatch, storedToken, loading, leaves, usernames]);

//   const status = useSelector((state) => state.leaveHistory.status);
//   const error = useSelector((state) => state.leaveHistory.error);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (status === 'failed') {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h2>Leave History </h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Type</th>
//             <th>Username</th>
//             <th>Reason</th>
//             <th>Leave Request Time</th>
//             <th>Start Leave Date</th>
//             <th>End Leave Date</th>
//             <th>Leave Status Time</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leaves.map((leave) => (
//             <tr key={leave.id}>
//               <td>{leave.leaveType}</td>
//               <td>{usernames[leave.userId] || 'N/A'}</td>
//               <td>{leave.reason}</td>
//               <td>{leave.leaveRequestTime}</td>
//               <td>{leave.startLeaveDate}</td>
//               <td>{leave.endLeaveDate}</td>
//               <td>{leave.leaveStatusTime}</td>
//               <td>{leave.status}</td>
//               <td>
//                 <button onClick={() => handleUpdateLeave(leave)}>Update Leave</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {selectedLeave && (
//         <div>
//           <h3>Update Leave</h3>
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               const updatedLeaveData = {
//                 id: selectedLeave.id, // Make sure to include the leave id
//                 leaveType: e.target.leaveType.value,
//                 username: e.target.username.value,
//                 reason: e.target.reason.value,
//                // leaveRequestTime: e.target.leaveRequestTime.value,
//                 startLeaveDate: e.target.startLeaveDate.value,
//                 endLeaveDate: e.target.endLeaveDate.value,
//                 //leaveStatusTime: e.target.leaveStatusTime.value,
//                 //status: e.target.status.value,
//               };
//               handleFormSubmit(updatedLeaveData);
//             }}
//           >
//             <label>
//               Type:
//               <input type="text" name="leaveType" defaultValue={selectedLeave.leaveType} />
//             </label>
//             <label>
//               Username:
//               <input type="text" name="username" defaultValue={usernames[selectedLeave.userId] || 'N/A'} />
//             </label>
//             <label>
//               Reason:
//               <input type="text" name="reason" defaultValue={selectedLeave.reason} />
//             </label>
//             {/* <label>
//               Leave Request Time:
//               <input type="text" name="leaveRequestTime" defaultValue={selectedLeave.leaveRequestTime} />
//             </label> */}
//             <label>
//               Start Leave Date:
//               <input type="text" name="startLeaveDate" defaultValue={selectedLeave.startLeaveDate} />
//             </label>
//             <label>
//               End Leave Date:
//               <input type="text" name="endLeaveDate" defaultValue={selectedLeave.endLeaveDate} />
//             </label>
//             {/* <label>
//               Leave Status Time:
//               <input type="text" name="leaveStatusTime" defaultValue={selectedLeave.leaveStatusTime} />
//             </label> */}
//             {/* <label>
//               Status:
//               <input type="text" name="status" defaultValue={selectedLeave.status} />
//             </label> */}
//             <button type="submit">Submit Update</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LeaveHistory;
// LeaveHistory.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLeaveHistory } from './LeaveHistorySlice';
import { useAuth } from '../AuthContext';
import { updateComponent } from './updateComponentSlice';

const LeaveHistory = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const storedToken = localStorage.getItem('token');
  const [usernames, setUsernames] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const leaves = useSelector((state) => state.leaveHistory.history);

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

  const handleUpdateLeave = (leave) => {
    console.log('Selected leave:', leave);
    setSelectedLeave(leave);
  };

  const handleFormSubmit = async (updatedLeaveData) => {
  console.log('handleFormSubmit called');
  try {
    if (selectedLeave && selectedLeave.id) {
      const leaveId = selectedLeave.id;

      console.log('Submitting form with leaveId:', leaveId);
      console.log('Updated leave data:', updatedLeaveData);

      // Update the properties that are missing
      updatedLeaveData.id = leaveId;
      updatedLeaveData.leaveRequestTime = selectedLeave.leaveRequestTime;
      updatedLeaveData.leaveStatusTime = selectedLeave.leaveStatusTime;
      updatedLeaveData.status = selectedLeave.status;

      // Dispatch the updateComponent thunk with the updated data
      await dispatch(updateComponent({ updatedData: updatedLeaveData }));

      // Reset selectedLeave after submission
      setSelectedLeave(null);
    }
  } catch (error) {
    console.error('Error updating leave:', error);
  }
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (storedToken && loading) {
          await dispatch(getLeaveHistory());

          const uniqueUserIds = [...new Set(leaves.map((leave) => leave.userId))];

          // Check if usernames have already been fetched
          if (Object.keys(usernames).length !== uniqueUserIds.length) {
            const usernamesMap = {};
            for (const userId of uniqueUserIds) {
              const username = await fetchUsernameById(userId);
              usernamesMap[userId] = username;
            }

            setUsernames(usernamesMap);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, storedToken, loading, leaves, usernames]);

  const status = useSelector((state) => state.leaveHistory.status);
  const error = useSelector((state) => state.leaveHistory.error);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Leave History </h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Username</th>
            <th>Reason</th>
            <th>Leave Request Time</th>
            <th>Start Leave Date</th>
            <th>End Leave Date</th>
            <th>Leave Status Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.leaveType}</td>
              <td>{usernames[leave.userId] || 'N/A'}</td>
              <td>{leave.reason}</td>
              <td>{leave.leaveRequestTime}</td>
              <td>{leave.startLeaveDate}</td>
              <td>{leave.endLeaveDate}</td>
              <td>{leave.leaveStatusTime}</td>
              <td>{leave.status}</td>
              <td>
                <button onClick={() => handleUpdateLeave(leave)}>Update Leave</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedLeave && (
        <div>
          <h3>Update Leave</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log('Form submitted');
              const updatedLeaveData = {
                id: selectedLeave.id, // Make sure to include the leave id
                leaveType: e.target.leaveType.value,
                username: e.target.username.value,
                reason: e.target.reason.value,
                 leaveRequestTime: e.target.leaveRequestTime.value,
                startLeaveDate: e.target.startLeaveDate.value,
                endLeaveDate: e.target.endLeaveDate.value,
                 leaveStatusTime: e.target.leaveStatusTime.value,
                 status: e.target.status.value,
              };
              console.log('Updated leave data:', updatedLeaveData);
              handleFormSubmit(updatedLeaveData);
            }}
          >
            <label>
              Type:
              <input type="text" name="leaveType" defaultValue={selectedLeave.leaveType} />
            </label>
            <label>
              Username:
              <input type="text" name="username" defaultValue={usernames[selectedLeave.userId] || 'N/A'} />
            </label>
            <label>
              Reason:
              <input type="text" name="reason" defaultValue={selectedLeave.reason} />
            </label>
            <label>
              Leave Request Time:
              <input type="text" name="leaveRequestTime" defaultValue={selectedLeave.leaveRequestTime} />
            </label>
            <label>
              Start Leave Date:
              <input type="text" name="startLeaveDate" defaultValue={selectedLeave.startLeaveDate} />
            </label>
            <label>
              End Leave Date:
              <input type="text" name="endLeaveDate" defaultValue={selectedLeave.endLeaveDate} />
            </label>
            <label>
              Leave Status Time:
              <input type="text" name="leaveStatusTime" defaultValue={selectedLeave.leaveStatusTime} />
            </label> 
             <label>
              Status:
              <input type="text" name="status" defaultValue={selectedLeave.status} />
            </label>
            <button type="submit">Submit Update</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LeaveHistory;



