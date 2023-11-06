import { Link, useLocation } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthLogin from './auth-forms/AuthLogin';
import AuthWrapper from './AuthWrapper';

// ================================|| LOGIN ||================================ //

const Login = () => {
  const location = useLocation();
  let isManager = false;
  if (location.pathname.includes('manager')) {
    isManager = true;
  }
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Đăng nhập</Typography>
            <Typography component={Link} to="/register" variant="body1" sx={{ textDecoration: 'none' }} className="text-primary">
              Chưa có tài khoản?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          {!isManager && <AuthLogin />}
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Login;
