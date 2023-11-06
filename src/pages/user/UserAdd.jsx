import { apiCreateUser } from 'apis/user';
import { Path } from 'constants/path';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import FormAddEditUser from './components/FormAddEditUser';

const UserAdd = () => {
  const navigate = useNavigate();
  const initialValues = {
    username: '',
    password: '',
    fullname: '',
    email: '',
    role_id: ''
  };

  document.title = 'Thêm người dùng';

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const response = await apiCreateUser(values);
      if (response?.status === 201) {
        Swal.fire({ title: 'Thêm người dùng thành công', icon: 'success' }).then(() => {
          navigate(Path.User, { replace: true });
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({ title: error.response.data, icon: 'error' });
    }
  };

  return <FormAddEditUser initialValues={initialValues} isEditMode={false} onSubmit={onSubmit} />;
};

export default UserAdd;
