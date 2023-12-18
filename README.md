# Performance-Management-System
# Backend for Performance Management System

## Overview

The backend of the Performance Management System is developed using ASP.NET, providing a robust foundation for managing user attendance efficiently. It includes features such as clock-in/out, break tracking, user management, and robust authorization/authentication using JWT Bearer. The system is designed to handle Performance data seamlessly and includes error handling for a smooth user experience.The system employs role-based authentication for manual request approval && leave Request Approval && Insert Event Designated roles are responsible for approving or rejecting leave requests submitted by employees. 
## Objective 

### The objective of the Performance Management System is to create a platform that:
- Facilitates easy and accurate tracking of employee attendance.
- Streamlines user management operations with CRUD functionalities.
- Ensures data security through JWT Bearer token authentication.
- Enhances overall user experience with efficient error handling.
## Business Needs
### To meet the business needs, the system focuses on:
- **Efficient Attendance Tracking:** Providing a reliable solution for accurately tracking and managing employee attendance.
- **User-Friendly Management:** Offering a user-friendly interface for seamless user and attendance data management.

## Real-Time_Events
### The system incorporates real-time events using SignalR to provide a dynamic and responsive user experience. Key real-time features include:
- **Live Clock-In/Out Updates:** Users receive real-time notifications when colleagues clock in or out.
- **Dashboard Synchronization:**  Real-time synchronization of attendance data on the user dashboard.
- **Break Notifications:** Instant notifications when a break is started or finished.
- **Request Approval/Reject Notifications:** The system also includes real-time notifications for request approval or rejection. When a user requests time off or submits any form of leave, concerned parties are instantly notified of the approval or rejection status. This feature streamlines the leave management process and provides quick feedback to users.
### Key Features

- **User Management:** CRUD operations for managing user details.
- **Clock-In/Out:** Employees can seamlessly record their attendance by using clock-in and clock-out features.Timestamps for clock-in and clock-out events are stored in the database.
- **Break Management:** The system includes break tracking functionality to monitor and manage breaks effectively.Break-related data is recorded for reporting and analysis purposes.
- **Authorization and Authentication:** JWT Bearer Authentication is implemented to ensure secure and stateless authentication.Role-based authorization is used to control access to different parts of the system.
- **Efficient Data Management:** Backend architecture for optimal handling of attendance data.
- **Error Handling:** Comprehensive error handling is implemented to ensure a smooth user experience.Meaningful error messages and status codes are returned to clients, aiding in debugging and issue resolution.
- **Role-Based Authentication for Manual Request Approval && Leave Request Approval:**
  The system employs role-based authentication for manual request approval. Authorized personnel with specific roles have the ability to approve or reject manual attendance requests.
  Similar to manual requests, leave requests are processed through role-based authentication. Designated roles are responsible for approving or rejecting leave requests submitted by employees.

## Technologies Used

- **Backend:** ASP.NET
- **Authentication:** JWT Bearer Token
- **Database:** Microsoft SQL Server Management Studio

## Authentication and Authorization

The system leverages JWT Bearer Token for secure authentication and authorization. Here's a brief overview:

- **Authentication:** Users obtain a JWT Bearer token upon successful login.
- **Authorization:** The token is required for accessing protected endpoints.
- **Token Management:** Token expiration and refresh mechanisms for enhanced security.
- **Secure Communication:** All communication is secured using HTTPS.

## Getting Started

### Prerequisites

- Install [Visual Studio](https://visualstudio.microsoft.com/) for ASP.NET development.
- Set up [Microsoft SQL Server Management Studio](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms).

# FrontEnd for Performance Management System
Welcome to the frontend documentation of the Performance Management System. This documentation provides an overview of the user interface and functionalities of the system. The Performance Management System is designed to seamlessly interact with the backend, allowing users to efficiently manage attendance, request approvals, and handle performance-related data.

## Project Structure
- front_pms_system
     -PMS_BACKEND_PROJECT
     -Public
     -Src
          -Components
  
          -Event
              -EventComponent.js
              -EventSlice.js
              -InsertEvent.js
              -InsertEventSlice.js
  
          -Leave
              -LeaveApplication.js
              -LeaveApplicationSlice.js
              -LeaveHistory.js
              -LeaveHistorySlice.js
              -LeaveStatus.js
              -LeaveStatusslice.js
  
          -ManualRequest
              -HrApprovalcomponent.js
              -HrApprovalcomponentSlice.js
              -UserManualComponent.js
              -UserSlice.js
              -ManualRequestComponent.js
              -ManualRequestComponentSlice.js

          -PrivateRoute.js
  
          -TimeManagement
              -ClockInOutSlice.js
              -StartFinishBreak.js
              -Constant.js

          -UserReport
              -UserReportComponent.js
              -UserReportSlice.js

          -AuthContext.js
          -AuthContextSlice.js

          -Home.js
          -Login.js
          -store.js
        
  
  ## Technologies Used
  -React
  -Redux/Toolkit
  -Thunk Middleware
  -Material-UI

  ## State Management
  -Redux Store
  -Actions and Reducers

  ## Routing
  -React Router Configuration
  -Protected Routes

## Styling
-CSS-in-JS Approach
-Theming with Material-UI

## API Integration
-Communication with ASP.NET Backend
-Authorization Headers

## Error Handling
-Client-Side Error Handling
-User-Friendly Error Messages

## Role-Based Authentication
-User Roles and Permissions
-Access Control in the UI

## User Interface
-Clock-In/Out Interface
-Break Tracking Interface
-User Management Interface
-Manual Request Approval Interface
-Leave Request Approval Interface
-Insert Event Interface

### Installation

1. Clone the repository.
   ```bash
   git clone https://github.com/pankajmalik3007/Performance_Management_System_Using_Asp.net_React-js..git
   
