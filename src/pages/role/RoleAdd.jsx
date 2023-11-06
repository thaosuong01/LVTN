import { apiCreateRole } from 'apis/role';
import { Path } from 'constants/path';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import FormAddEditRole from './components/FormAddEditRole';

const RoleAdd = () => {
  const navigate = useNavigate();
  const initialValues = {
    role_name: '',
    description: ''
  };

  document.title = 'Thêm vai trò';

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const response = await apiCreateRole(values);
      if (response?.status === 201) {
        Swal.fire({ title: 'Thêm vai trò thành công', icon: 'success' }).then(() => {
          navigate(Path.Role, { replace: true });
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({ title: error.response.data, icon: 'error' });
    }
  };

  return <FormAddEditRole initialValues={initialValues} isEditMode={false} onSubmit={onSubmit} />;
};

export default RoleAdd;
