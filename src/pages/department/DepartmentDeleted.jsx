import { AddCircleOutlined, Clear } from '@mui/icons-material';
import { Box, Button, Container, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { apiDeleteDepartment, apiGetListDepartment } from 'apis/department';
import { Path } from 'constants/path';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const DepartmentDeleted = () => {
  const actionButton = (params) => (
    <div className="flex gap-4">
      <Button onClick={() => handleDelete(params.row._id)} variant="contained" className="bg-primary hover:bg-hover">
        <Clear />
      </Button>
    </div>
  );

  const columns = [
    {
      field: 'department_name',
      headerName: 'Department Name',
      width: 900
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
          await apiDeleteDepartment(id);

          Swal.fire('Deleted!', 'The course has been deleted.', 'success');
          fetchDepartment();
        } catch (error) {
          Swal.fire('Fail!', 'Delete fail', 'error');
        }
      }
    });
  };
  const [departments, setDepartment] = useState([]);

  document.title = 'Khoa';

  const fetchDepartment = async () => {
    try {
      const response = await apiGetListDepartment();
      const filteredDepart = response?.data?.filter((depart) => depart.delete);
      setDepartment(filteredDepart);
    } catch (error) {
      console.log('Failed to fetch department list: ', error);
    }
  };
  useEffect(() => {
    fetchDepartment();
  }, []);

  return (
    <Container maxWidth={'lg'}>
      <Box display={'flex'} justifyContent={'space-between'} marginBottom={2}>
        <Typography variant="h2" color="initial">
          Danh sách khoa
        </Typography>

        <div className="flex gap-2">
          <Button
            variant="contained"
            startIcon={<AddCircleOutlined />}
            LinkComponent={Link}
            to={Path.Department}
            className="bg-primary hover:bg-hover"
          >
            Danh sách khoa
          </Button>
        </div>
      </Box>
      <Box sx={{ height: 430, width: '100%' }}>
        <DataGrid
          checkboxSelection
          rows={departments}
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
          getRowId={(departments) => departments._id}
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

export default DepartmentDeleted;
