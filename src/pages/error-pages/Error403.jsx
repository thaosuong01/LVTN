import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Path } from 'constants/path';

const Error403 = () => {
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
        403
      </Typography>

      <Typography variant="h5" component="h2">
        Forbidden
      </Typography>

      <Typography>Bạn không có quyền truy cập trang này</Typography>

      <Button
        sx={{ marginTop: 1 }}
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

export default Error403;
