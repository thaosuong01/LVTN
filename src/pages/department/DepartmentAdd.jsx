import { Path } from 'constants/path';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import FormAddEditDepartment from './components/FormAddEditDepartment';
import { apiCreateDepartment } from 'apis/department';

const DepartmentAdd = () => {
  const navigate = useNavigate();
  const initialValues = {
    course_code: '',
    course_name: '',
    department_id: ''
  };

  document.title = 'Thêm khoa';

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const response = await apiCreateDepartment(values);
      if (response?.status === 201) {
        Swal.fire({ title: 'Thêm khoa thành công', icon: 'success' }).then(() => {
          navigate(Path.Department, { replace: true });
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({ title: error.response.data, icon: 'error' });
    }
  };

  return <FormAddEditDepartment initialValues={initialValues} isEditMode={false} onSubmit={onSubmit} />;
};

export default DepartmentAdd;
