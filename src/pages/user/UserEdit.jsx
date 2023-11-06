import React, { useEffect, useState } from 'react';
import FormAddEditUser from './components/FormAddEditUser';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { apiGetUserById, apiUpdateUserById } from 'apis/user';
import Swal from 'sweetalert2';
import { Path } from 'constants/path';

const UserEdit = () => {
  const [initialValues, setInitialValues] = useState({
    username: '',
    fullname: '',
    email: '',
    role_id: ''
  });
  console.log('initialValues: ', initialValues);

  const navigate = useNavigate();

  const { id } = useParams();

  document.title = 'Cập nhật thông tin người dùng';
  // Fetch staff detail
  const fetchUserById = async (id) => {
    try {
      const response = await apiGetUserById(id);
      setInitialValues({
        username: response?.data?.account_id?.username,
        fullname: response?.data?.fullname,
        email: response?.data?.email,
        role_id: response?.data?.role_id?._id
      });
    } catch (error) {
      console.log('Failed to fetch user detail: ', error);
    }
  };
  useEffect(() => {
    fetchUserById(id);
  }, [id]);

  // Handle submit form
  const onSubmit = async (values, { setSubmitting }) => {
    console.log('values: ', values);

    setSubmitting(true);
    try {
      const response = await apiUpdateUserById(id, values);
      console.log('response: ', response);
      if (response?.status === 200) {
        Swal.fire({ title: 'Cập nhật người dùng thành công', icon: 'success' }).then(() => {
          navigate(Path.User, { replace: true });
        });
      }
    } catch (error) {
      console.log('Failed to update user: ', error);
      Swal.fire({ title: error.response.data.message || 'Cập nhật thất bại', icon: 'error' });
    }
  };
  return <FormAddEditUser initialValues={initialValues} isEditMode={true} onSubmit={onSubmit} />;
};

export default UserEdit;
