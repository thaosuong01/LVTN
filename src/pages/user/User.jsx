import { AddCircleOutlined, Clear, EditOutlined } from '@mui/icons-material';
import { Box, Button, Container, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { apiDeleteUser, apiGetListUser } from 'apis/user';
import { Path } from 'constants/path';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const User = () => {
  const actionButton = (params) => (
    <div className="flex gap-4">
      <Button LinkComponent={Link} to={`${Path.UserEdit}/${params.row._id}`} variant="contained" className="bg-primary hover:bg-hover">
        <EditOutlined />
      </Button>
      <Button onClick={() => handleDelete(params.row._id)} variant="contained" className="bg-primary hover:bg-hover">
        <Clear />
      </Button>
    </div>
  );

  const columns = [
    {
      field: 'account_id',
      headerName: 'Username',
      width: 260,
      valueGetter: (params) => params.row.account_id?.username
    },
    {
      field: 'fullname',
      headerName: 'Full Name',
      width: 240
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 260
    },
    {
      field: 'role_id',
      headerName: 'Role',
      width: 160,
      valueGetter: (params) => params.row.role_id?.role_name
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
          await apiDeleteUser(id);

          Swal.fire('Deleted!', 'User has been deleted.', 'success');
          fetchUser();
        } catch (error) {
          Swal.fire('Fail!', 'Delete fail', 'error');
        }
      }
    });
  };
  const [users, setUsers] = useState([]);

  document.title = 'Người dùng';

  const fetchUser = async () => {
    try {
      const response = await apiGetListUser();
      setUsers(response?.data);
    } catch (error) {
      console.log('Failed to fetch user list: ', error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Container maxWidth={'lg'}>
      <Box display={'flex'} justifyContent={'space-between'} marginBottom={2}>
        <Typography variant="h2" color="initial">
          Danh sách người dùng
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddCircleOutlined />}
          LinkComponent={Link}
          to={Path.UserAdd}
          className="bg-primary hover:bg-hover"
        >
          Thêm người dùng
        </Button>
      </Box>
      <Box sx={{ height: 430, width: '100%' }}>
        <DataGrid
          checkboxSelection
          rows={users}
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
          getRowId={(users) => users._id}
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

export default User;