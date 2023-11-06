import { apiGetCourseById, apiUpdateCourseById } from 'apis/course';
import { Path } from 'constants/path';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import FormAddEditCourse from './components/FormAddEditCourse';

const CourseEdit = () => {
  const [initialValues, setInitialValues] = useState({
    course_code: '',
    course_name: '',
    department_id: ''
  });
  console.log('initialValues: ', initialValues);

  const navigate = useNavigate();

  const { id } = useParams();

  document.title = 'Cập nhật thông tin khóa học';
  // Fetch staff detail
  const fetchCourseById = async (id) => {
    try {
      const response = await apiGetCourseById(id);
      setInitialValues({
        course_code: response?.data?.course_code,
        course_name: response?.data?.course_name,
        department_id: response?.data?.department_id?._id
      });
    } catch (error) {
      console.log('Failed to fetch course detail: ', error);
    }
  };
  useEffect(() => {
    fetchCourseById(id);
  }, [id]);

  // Handle submit form
  const onSubmit = async (values, { setSubmitting }) => {
    console.log('values: ', values);

    setSubmitting(true);
    try {
      const response = await apiUpdateCourseById(id, values);
      console.log('response: ', response);
      if (response?.status === 200) {
        Swal.fire({ title: 'Cập nhật khóa học thành công', icon: 'success' }).then(() => {
          navigate(Path.Course, { replace: true });
        });
      }
    } catch (error) {
      console.log('Failed to update course: ', error);
      Swal.fire({ title: error.response.data.message || 'Cập nhật thất bại', icon: 'error' });
    }
  };
  return <FormAddEditCourse initialValues={initialValues} isEditMode={true} onSubmit={onSubmit} />;
};

export default CourseEdit;
