import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>Home Page</h2>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/home/leaveapp">Leave App</Link>
          </li>
          <li>
            <Link to="/home/leavestatus">Leave Status App</Link>
          </li>
        </ul>
      </nav>
      
      <Outlet />
    </div>
  );
};

export default Home;
