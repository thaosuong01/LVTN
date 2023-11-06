import { Button, Container, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import { ErrorMessage, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

const FormAddEditRole = ({ initialValues, onSubmit, isEditMode }) => {
  // validationSchema form with Yup
  const validationSchema = Yup.object().shape({
    description: Yup.string().required('Vui lòng nhập mô tả vai trò'),
    role_name: Yup.string().required('Vui lòng nhập tên vai trò')
  });

  return (
    <Container maxWidth={'md'}>
      <Typography marginBottom={2} variant="h3" color="initial">
        {isEditMode ? 'Cập nhật vai trò' : 'Thêm vai trò'}
      </Typography>
      <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ handleChange, handleSubmit, values, touched, errors, isSubmitting }) => {
          console.log('errors: ', errors);
          return (
            <Form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Stack spacing={0.5}>
                    <InputLabel htmlFor="role_name">Tên vai trò</InputLabel>
                    <OutlinedInput
                      fullWidth
                      value={values.role_name}
                      onChange={handleChange}
                      id="role_name"
                      name="role_name"
                      disabled={isSubmitting}
                      placeholder="Nhập tên vai trò"
                      error={Boolean(touched.role_name && errors.role_name)}
                      autoComplete="on"
                    />
                    <ErrorMessage name="role_name">{(msg) => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={0.5}>
                    <InputLabel htmlFor="description">Mô tả vai trò</InputLabel>
                    <OutlinedInput
                      fullWidth
                      value={values.description}
                      onChange={handleChange}
                      id="description"
                      name="description"
                      disabled={isSubmitting}
                      placeholder="Nhập mô tả"
                      error={Boolean(touched.description && errors.description)}
                      autoComplete="on"
                    />
                    <ErrorMessage name="description">{(msg) => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" className="bg-primary hover:bg-hover" disabled={isSubmitting}>
                    {isEditMode ? 'Cập nhật vai trò' : 'Thêm vai trò'}
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

FormAddEditRole.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool
};

export default FormAddEditRole;
