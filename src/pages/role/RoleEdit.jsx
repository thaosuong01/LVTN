import { apiGetRoleById, apiUpdateRoleById } from 'apis/role';
import { Path } from 'constants/path';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import FormAddEditRole from './components/FormAddEditRole';

const RoleEdit = () => {
  const [initialValues, setInitialValues] = useState({
    role_name: '',
    description: ''
  });
  console.log('initialValues: ', initialValues);

  const navigate = useNavigate();

  const { id } = useParams();

  document.title = 'Cập nhật vai trò';
  // Fetch staff detail
  const fetchRoleById = async () => {
    try {
      const reponse = await apiGetRoleById(id);
      setInitialValues(reponse?.data);
    } catch (error) {
      console.log('Failed to fetch role detail: ', error);
    }
  };
  useEffect(() => {
    fetchRoleById(id);
  }, [id]);

  // Handle submit form
  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const response = await apiUpdateRoleById(id, values);
      console.log('response: ', response);
      if (response?.status === 200) {
        Swal.fire({ title: 'Cập nhật vai trò thành công', icon: 'success' }).then(() => {
          navigate(Path.Role, { replace: true });
        });
      }
    } catch (error) {
      console.log('Failed to update role: ', error);
      Swal.fire({ title: error.response.data.message || 'Cập nhật thất bại', icon: 'error' });
    }
  };
  return <FormAddEditRole initialValues={initialValues} isEditMode={true} onSubmit={onSubmit} />;
};

export default RoleEdit;
