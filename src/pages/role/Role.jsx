import { AddCircleOutlined, Clear, EditOutlined } from '@mui/icons-material';
import { Box, Button, Container, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { apiDeleteRole, apiGetListRole } from 'apis/role';
import { Path } from 'constants/path';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Role = () => {
  const actionButton = (params) => (
    <div className="flex gap-4">
      <Button LinkComponent={Link} to={`${Path.RoleEdit}/${params.row._id}`} variant="contained" className="bg-primary hover:bg-hover">
        <EditOutlined />
      </Button>
      <Button onClick={() => handleDelete(params.row._id)} variant="contained" className="bg-primary hover:bg-hover">
        <Clear />
      </Button>
    </div>
  );

  const columns = [
    {
      field: 'role_name',
      headerName: 'Role Name',
      width: 340
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 360
    },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      filterable: false,
      width: 180,
      renderCell: actionButton
    }
  ];

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ffae00',
      cancelButtonColor: '#90c446',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiDeleteRole(id);

          Swal.fire('Deleted!', 'Role has been deleted.', 'success');
          fetchRole();
        } catch (error) {
          Swal.fire('Fail!', 'Delete fail', 'error');
        }
      }
    });
  };
  const [roles, setRoles] = useState([]);

  document.title = 'Vai trò';

  const fetchRole = async () => {
    try {
      const response = await apiGetListRole();
      setRoles(response?.data);
    } catch (error) {
      console.log('Failed to fetch role list: ', error);
    }
  };
  useEffect(() => {
    fetchRole();
  }, []);

  return (
    <Container maxWidth={'md'}>
      <Box display={'flex'} justifyContent={'space-between'} marginBottom={2}>
        <Typography variant="h2" color="initial">
          Danh sách vai trò
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddCircleOutlined />}
          LinkComponent={Link}
          to={Path.RoleAdd}
          className="bg-primary hover:bg-hover"
        >
          Thêm vai trò
        </Button>
      </Box>
      <Box sx={{ height: 430, width: '100%' }}>
        <DataGrid
          checkboxSelection
          rows={roles}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5
              }
            }
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true
            }
          }}
          getRowId={(roles) => roles._id}
          pageSizeOptions={[5]}
          sx={{
            '& div div div div div .MuiDataGrid-withBorderColor': {
              borderBottomColor: '#ccc'
            },
            '& div .MuiDataGrid-columnHeaders': {
              borderColor: '#ccc'
            },
            // Table head
            '& div div div div div div div div .MuiDataGrid-columnHeaderTitle': {
              fontWeight: '700',
              textTransform: 'uppercase'
            },

            borderColor: '#ccc',
            boxShadow: '1px 1px 5px 1px #ddd',
            borderRadius: '5px',
            fontSize: '14px'
          }}
        />
      </Box>
    </Container>
  );
};

export default Role;
