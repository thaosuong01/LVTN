import { apiGetDepartmentById, apiUpdateDepartmentById } from 'apis/department';
import { Path } from 'constants/path';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import FormAddEditDepartment from './components/FormAddEditDepartment';

const DepartmentEdit = () => {
  const [initialValues, setInitialValues] = useState({
    department_name: '',
  });
  console.log('initialValues: ', initialValues);

  const navigate = useNavigate();

  const { id } = useParams();

  document.title = 'Cập nhật thông tin khoa';
  // Fetch staff detail
  const fetchDepartmentById = async (id) => {
    try {
      const response = await apiGetDepartmentById(id);
      setInitialValues({
        department_name: response?.data?.department_name,
      });
    } catch (error) {
      console.log('Failed to fetch department detail: ', error);
    }
  };
  useEffect(() => {
    fetchDepartmentById(id);
  }, [id]);

  // Handle submit form
  const onSubmit = async (values, { setSubmitting }) => {
    console.log('values: ', values);

    setSubmitting(true);
    try {
      const response = await apiUpdateDepartmentById(id, values);
      console.log('response: ', response);
      if (response?.status === 200) {
        Swal.fire({ title: 'Cập nhật khoa thành công', icon: 'success' }).then(() => {
          navigate(Path.Department, { replace: true });
        });
      }
    } catch (error) {
      console.log('Failed to update department: ', error);
      Swal.fire({ title: error.response.data.message || 'Cập nhật thất bại', icon: 'error' });
    }
  };
  return <FormAddEditDepartment initialValues={initialValues} isEditMode={true} onSubmit={onSubmit} />;
};

export default DepartmentEdit;
