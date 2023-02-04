import React, { useState, useContext } from 'react';
import { TextField, Box, Button, Typography } from '@mui/material';
import { AuthContext } from '../context/auth-context';

type Props = {};

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { setName, login } = useContext(AuthContext);

  const handleSubmit = async () => {
    const response = await fetch('http://127.0.0.1:5000/logIn', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: userName,
        password,
      }),
    });
    const data = await response.json();
    setName(data.user.name);
    login(data.user.id, data.access_token);
  };
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={1}
      alignItems="center"
      justifyContent={'center'}
      height={'100vh'}
    >
      <Typography variant="h5">Login</Typography>
      <TextField
        required
        id="outlined-required"
        label="Email"
        defaultValue={userName}
        onChange={(e: any) => setUserName(e.target.value)}
      />
      <TextField
        required
        id="outlined-required"
        label="Password"
        type="password"
        defaultValue={password}
        onChange={(e: any) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default Login;
