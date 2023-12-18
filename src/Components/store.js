
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import leaveReducer from '../Components/Leave/LeaveSlice'; 
import leaveStatusReducer from '../Components/LeaveStatusSlice';
import leaveHistoryReducer from '../Components/Leave/LeaveHistorySlice';
import updateComponentReducer from '../Components/Leave/updateComponentSlice';
import clockInOutReducer from '../Components/TimeManagement/ClockInOutSlice';
import startFinishBreakReducer from '../Components/TimeManagement/StartFinishBreakSlice';
import userReducer  from '../Components/UserComponent/userSlice';
import userAttendanceReducer from '../Components/Leave/UserAttendence/UserAttendenceSlice';
import manualRequestReducer from '../Components/ManualRequest/ManualRequestSlice';
import userReportReducer from '../Components/UserReportHistory/UserReportSlice';
import eventReducer from '../Components/Event/EventSlice';
import eventInsertReducer from '../Components/EventInsert/EventInsertSlice';
import userManualReducer from '../Components/ManualRequest/ShowManual/UserManualSlice';
import manualApprovalReducer from '../Components/ManualRequest/HRAPPROVAL/ManualApprovalSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    leave: leaveReducer,
    leaveStatus: leaveStatusReducer,
    leaveHistory: leaveHistoryReducer,
    updateComponent: updateComponentReducer,
    clockInOut: clockInOutReducer,
    startFinishBreak: startFinishBreakReducer, 
    user: userReducer,
    userAttendance: userAttendanceReducer,
    manualRequest: manualRequestReducer,
    userReport: userReportReducer,
    event: eventReducer,
    eventInsert: eventInsertReducer,
    userManual: userManualReducer, 
    manualApproval: manualApprovalReducer,
  },
});

export default store;
