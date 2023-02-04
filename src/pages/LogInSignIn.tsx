import SignIn from '../components/SignIn';
import Login from '../components/Login';
import { TextField, Box, Button, Typography } from '@mui/material';

type Props = {};

const LogInSignIn = (props: Props) => {
  return (
    <Box display={'flex'} width="100vw" justifyContent={'center'} gap={10}>
      <SignIn />
      <Login />
    </Box>
  );
};

export default LogInSignIn;
