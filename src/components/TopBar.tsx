import { Box, Button } from '@mui/material';
import { AuthContext } from '../context/auth-context';
import { useContext } from 'react';

const TopBar = () => {
  const { logout } = useContext(AuthContext);
  return (
    <Box>
      <Button onClick={logout}>LogOut</Button>
    </Box>
  );
};

export default TopBar;
