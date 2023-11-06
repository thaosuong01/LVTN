import {
  Button,
  Container,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography
} from '@mui/material';
import { apiGetListDepartment } from 'apis/department';
import { ErrorMessage, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

const FormAddEditCourse = ({ initialValues, onSubmit, isEditMode }) => {

  // validationSchema form with Yup
  const validationSchema = Yup.object().shape({
    course_code: Yup.string().required('Vui lòng nhập mã khóa học'),
    course_name: Yup.string().required('Vui lòng nhập tên khóa học'),
    department_id: Yup.string().required('Vui lòng chọn khoa')
  });

  //Get list position
  const [departments, setDepartments] = useState([]);

  // Get list position
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await apiGetListDepartment();
        setDepartments(response?.data);
      } catch (error) {
        console.log('Failed to fetch position list: ', error);
      }
    };
    fetchRole();
  }, []);

  return (
    <Container maxWidth={'md'}>
      <Typography marginBottom={2} variant="h3" color="initial">
        {isEditMode ? 'Cập nhật khóa học' : 'Thêm khóa học'}
      </Typography>
      <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ handleChange, handleSubmit, values, touched, errors, isSubmitting }) => {
          console.log('errors: ', errors);
          return (
            <Form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Stack spacing={0.5}>
                    <InputLabel htmlFor="course_code">Mã khóa học</InputLabel>
                    <OutlinedInput
                      fullWidth
                      value={values?.course_code}
                      onChange={handleChange}
                      id="course_code"
                      name="course_code"
                      disabled={isSubmitting}
                      placeholder="Nhập mã khóa học"
                      error={Boolean(touched.course_code && errors.course_code)}
                      // autoComplete="off"
                    />
                    <ErrorMessage name="course_code">{(msg) => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={0.5}>
                    <InputLabel htmlFor="course_name">Tên khóa học</InputLabel>
                    <OutlinedInput
                      fullWidth
                      value={values.course_name}
                      onChange={handleChange}
                      id="course_name"
                      name="course_name"
                      disabled={isSubmitting}
                      placeholder="Nhập tên khóa học"
                      error={Boolean(touched.course_name && errors.course_name)}
                      autoComplete="on"
                    />
                    <ErrorMessage name="fullame">{(msg) => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Stack spacing={0.5}>
                    <InputLabel htmlFor="department_id">Khoa</InputLabel>
                    <Select
                      onChange={handleChange}
                      labelId="department_id"
                      name="department_id"
                      value={values?.department_id || ''}
                      id="department_id"
                      error={Boolean(touched.department_id && errors.department_id)}
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      {departments.map((department) => (
                        <MenuItem key={department?._id} value={department._id}>
                          {department?.department_name}
                        </MenuItem>
                      ))}
                    </Select>
                    <ErrorMessage name="role_id">{(msg) => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" className="bg-primary hover:bg-hover" disabled={isSubmitting}>
                    {isEditMode ? 'Cập nhật khóa học' : 'Thêm khóa học'}
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

FormAddEditCourse.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool
};

export default FormAddEditCourse;
