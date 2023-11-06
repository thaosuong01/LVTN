import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  Container,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography
} from '@mui/material';
import { apiGetListRole } from 'apis/role';
import { ErrorMessage, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

const FormAddEditUser = ({ initialValues, onSubmit, isEditMode }) => {
  // Handle show password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // validationSchema form with Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Vui lòng nhập tên đăng nhập'),
    fullname: Yup.string().required('Vui lòng nhập họ và tên'),
    password: isEditMode ? Yup.string() : Yup.string().required('Vui lòng nhập mật khẩu'),
    email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    role_id: Yup.string().required('Vui lòng chọn vai trò')
  });

  //Get list position
  const [roles, setRoles] = useState([]);

  // Get list position
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await apiGetListRole();
        setRoles(response?.data);
      } catch (error) {
        console.log('Failed to fetch position list: ', error);
      }
    };
    fetchRole();
  }, []);

  return (
    <Container maxWidth={'md'}>
      <Typography marginBottom={2} variant="h3" color="initial">
        {isEditMode ? 'Cập nhật nhân viên' : 'Thêm nhân viên'}
      </Typography>
      <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ handleChange, handleSubmit, values, touched, errors, isSubmitting }) => {
          console.log('errors: ', errors);
          return (
            <Form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Stack spacing={0.5}>
                    <InputLabel htmlFor="username">Tên đăng nhập</InputLabel>
                    <OutlinedInput
                      fullWidth
                      value={values?.username}
                      onChange={handleChange}
                      id="username"
                      name="username"
                      disabled={isSubmitting}
                      placeholder="Nhập tên đăng nhập"
                      error={Boolean(touched.username && errors.username)}
                      // autoComplete="off"
                    />
                    <ErrorMessage name="username">{(msg) => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={0.5}>
                    <InputLabel htmlFor="fullname">Họ và tên</InputLabel>
                    <OutlinedInput
                      fullWidth
                      value={values.fullname}
                      onChange={handleChange}
                      id="fullname"
                      name="fullname"
                      disabled={isSubmitting}
                      placeholder="Nhập họ và tên"
                      error={Boolean(touched.fullname && errors.fullname)}
                      autoComplete="on"
                    />
                    <ErrorMessage name="fullame">{(msg) => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={0.5}>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <OutlinedInput
                      fullWidth
                      value={values.email}
                      onChange={handleChange}
                      id="email"
                      name="email"
                      disabled={isSubmitting}
                      placeholder="Nhập địa chỉ email"
                      error={Boolean(touched.email && errors.email)}
                      autoComplete="on"
                    />
                    <ErrorMessage name="email">{(msg) => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                  </Stack>
                </Grid>

                {isEditMode ? null : (
                  <Grid item xs={12}>
                    <Stack spacing={0.5}>
                      <InputLabel htmlFor="password">Mật khẩu</InputLabel>
                      <OutlinedInput
                        fullWidth
                        value={values?.password || ''}
                        onChange={handleChange}
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="on"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={(e) => {
                                e.preventDefault();
                              }}
                              edge="end"
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                        variant="outlined"
                        disabled={isSubmitting}
                        placeholder="Nhập mật khẩu"
                        error={Boolean(touched.password && errors.password)}
                      />
                      <ErrorMessage name="password">{(msg) => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                    </Stack>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Stack spacing={0.5}>
                    <InputLabel htmlFor="role_id">Vai trò</InputLabel>
                    <Select
                      onChange={handleChange}
                      labelId="role_id"
                      name="role_id"
                      value={values?.role_id || ''}
                      id="role_id"
                      error={Boolean(touched.role_id && errors.role_id)}
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      {roles.map((role) => (
                        <MenuItem key={role?._id} value={role._id}>
                          {role?.role_name}
                        </MenuItem>
                      ))}
                    </Select>
                    <ErrorMessage name="role_id">{(msg) => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" className="bg-primary hover:bg-hover" disabled={isSubmitting}>
                    {isEditMode ? 'Cập nhật người dùng' : 'Thêm người dùng'}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

FormAddEditUser.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool
};

export default FormAddEditUser;
