import React from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Path } from 'constants/path';

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}
    >
      <Typography variant="h1" component="h1">
        404
      </Typography>
      <Typography variant="h5" component="h2">
        Page not found
      </Typography>
      <Typography>The page you are looking for does not exist or an other error occurred.</Typography>
      <Button
        variant="contained"
        onClick={() => {
          navigate(Path.Home);
        }}
        color="primary"
      >
        Back home
      </Button>
    </Box>
  );
};

export default Error404;
