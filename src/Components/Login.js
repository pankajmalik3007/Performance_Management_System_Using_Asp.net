
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { loginSuccess, loginFailure } from '../Components/authSlice';

// const Login = () => {
//   const dispatch = useDispatch();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);

//   const handleLogin = async () => {
//     try {
//       console.log('Before fetch');
//       const response = await fetch('https://localhost:44356/api/Login/Login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });
//       console.log('After fetch');
  
//       const data = await response.json();
//       console.log('Response data:', data);
  
//       if (response.ok) {
//         dispatch(loginSuccess({ user: data.user, token: data.token }));
//       } else {
//         setError(`Invalid username or password. Server response: ${data.message}`);
//         dispatch(loginFailure(`Invalid username or password. Server response: ${data.message}`));
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       setError('An error occurred during login');
//       dispatch(loginFailure('An error occurred during login'));
//     }
//   };
  
//   return (
//     <div>
//       <h2>Login</h2>
//       <div style={{ color: 'red' }}>{error}</div>
//       <label>
//         Username:
//         <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//       </label>
//       <br />
//       <label>
//         Password:
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       </label>
//       <br />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default Login;






// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { loginSuccess, loginFailure } from '../Components/authSlice';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Use useNavigate hook
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);

//   const handleLogin = async () => {
//     try {
//       console.log('Before fetch');
//       const response = await fetch('https://localhost:44356/api/Login/Login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });
//       console.log('After fetch');

//       const data = await response.json();
//       console.log('Response data:', data);

//       if (response.ok) {
        
//         localStorage.setItem('yourTokenKey', data.token);

        
//         dispatch(loginSuccess({ user: data.user, token: data.token }));

        
//         navigate('/home');
//       } else {
//         setError(`Invalid username or password. Server response: ${data.message}`);
//         dispatch(loginFailure(`Invalid username or password. Server response: ${data.message}`));
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       setError('An error occurred during login');
//       dispatch(loginFailure('An error occurred during login'));
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <div style={{ color: 'red' }}>{error}</div>
//       <label>
//         Username:
//         <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//       </label>
//       <br />
//       <label>
//         Password:
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       </label>
//       <br />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default Login;




// Login.js

// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { loginSuccess, loginFailure } from '../Components/authSlice';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);

//   const handleLogin = async () => {
//     try {
//       const response = await fetch('https://localhost:44356/api/Login/Login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         localStorage.setItem('yourTokenKey', data.token);
//         dispatch(loginSuccess({ user: data.user, token: data.token }));
//         navigate('/home');
//       } else {
//         if (response.status === 401) {
//           setError('Unauthorized access. Please check your credentials.');
//         } else {
//           setError(`Invalid username or password. Server response: ${data.message}`);
//         }
//         dispatch(loginFailure('Login failed'));
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       setError('An error occurred during login');
//       dispatch(loginFailure('An error occurred during login'));
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <div style={{ color: 'red' }}>{error}</div>
//       <label>
//         Username:
//         <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//       </label>
//       <br />
//       <label>
//         Password:
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       </label>
//       <br />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../Components/authSlice';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  CssBaseline,
} from '@mui/material';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await fetch('https://localhost:44356/api/Login/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('yourTokenKey', data.token);
        dispatch(loginSuccess({ user: data.user, token: data.token }));
        navigate('/home');
      } else {
        if (response.status === 401) {
          setError('Unauthorized access. Please check your credentials.');
        } else {
          setError(`Invalid username or password. Server response: ${data.message}`);
        }
        dispatch(loginFailure('Login failed'));
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login');
      dispatch(loginFailure('An error occurred during login'));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h2" variant="h5">
          Login
        </Typography>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '20px' }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
