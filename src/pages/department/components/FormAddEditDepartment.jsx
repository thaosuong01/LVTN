import {
  Button,
  Container,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';
import { ErrorMessage, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

const FormAddEditDepartment = ({ initialValues, onSubmit, isEditMode }) => {

  // validationSchema form with Yup
  const validationSchema = Yup.object().shape({
    department_name: Yup.string().required('Vui lòng nhập tên khoa'),
  });


  return (
    <Container maxWidth={'md'}>
      <Typography marginBottom={2} variant="h3" color="initial">
        {isEditMode ? 'Cập nhật khoa' : 'Thêm khoa'}
      </Typography>
      <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ handleChange, handleSubmit, values, touched, errors, isSubmitting }) => {
          console.log('errors: ', errors);
          return (
            <Form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Stack spacing={0.5}>
                    <InputLabel htmlFor="department_name">Tên khoa</InputLabel>
                    <OutlinedInput
                      fullWidth
                      value={values.department_name}
                      onChange={handleChange}
                      id="department_name"
                      name="department_name"
                      disabled={isSubmitting}
                      placeholder="Nhập họ và tên"
                      error={Boolean(touched.department_name && errors.department_name)}
                      autoComplete="on"
                    />
                    <ErrorMessage name="fullame">{(msg) => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" className="bg-primary hover:bg-hover" disabled={isSubmitting}>
                    {isEditMode ? 'Cập nhật khoa' : 'Thêm khoa'}
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

FormAddEditDepartment.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool
};

export default FormAddEditDepartment;
