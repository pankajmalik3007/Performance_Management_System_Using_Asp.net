
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from './userSlice';

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

      {userDetails && (
        <div>
         
          <pre>{JSON.stringify(userDetails, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default UserDetailsByName;
