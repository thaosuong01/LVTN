import { apiCreateCourse } from 'apis/course';
import { Path } from 'constants/path';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import FormAddEditCourse from './components/FormAddEditCourse';

const CourseAdd = () => {
  const navigate = useNavigate();
  const initialValues = {
    course_code: '',
    course_name: '',
    department_id: ''
  };

  document.title = 'Thêm khóa học';

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const response = await apiCreateCourse(values);
      if (response?.status === 201) {
        Swal.fire({ title: 'Thêm khóa học thành công', icon: 'success' }).then(() => {
          navigate(Path.Course, { replace: true });
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({ title: error.response.data, icon: 'error' });
    }
  };

  return <FormAddEditCourse initialValues={initialValues} isEditMode={false} onSubmit={onSubmit} />;
};

export default CourseAdd;
