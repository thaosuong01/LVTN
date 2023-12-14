import { AddCircleOutlined, Clear } from '@mui/icons-material';
import { Box, Button, Container, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { apiDeleteClass, apiGetListClass } from 'apis/class';
import { Path } from 'constants/path';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Class = () => {
  const actionButton = (params) => (
    <Button onClick={() => handleDelete(params.row._id)} variant="contained" className="bg-primary hover:bg-hover">
      <Clear />
    </Button>
  );

  const columns = [
    {
      field: 'class_code',
      headerName: 'Class Code',
      width: 120
    },
    {
      field: 'class_name',
      headerName: 'Class Name',
      width: 260
    },
    {
      field: 'display',
      headerName: 'Display',
      width: 140
    },
    {
      field: 'owner',
      headerName: 'Owner',
      width: 220,
      valueGetter: (params) => params.row.owner?.fullname
    },
    {
      field: 'course_id',
      headerName: 'Course',
      width: 240,
      valueGetter: (params) => params.row.course_id?.course_name
    },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      filterable: false,
      width: 100,
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
          await apiDeleteClass(id);

          Swal.fire('Deleted!', 'The class has been deleted.', 'success');
          fetchClass();
        } catch (error) {
          Swal.fire('Fail!', 'Delete fail', 'error');
        }
      }
    });
  };
  const [classes, setClasses] = useState([]);

  document.title = 'Lớp học';

  const fetchClass = async () => {
    try {
      const response = await apiGetListClass();
      setClasses(response?.data);
    } catch (error) {
      console.log('Failed to fetch class list: ', error);
    }
  };
  useEffect(() => {
    fetchClass();
  }, []);

  return (
    <Container maxWidth={'lg'}>
      <Box display={'flex'} justifyContent={'space-between'} marginBottom={2}>
        <Typography variant="h2" color="initial">
          Danh sách lớp học
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddCircleOutlined />}
          LinkComponent={Link}
          to={Path.ClassAdd}
          className="bg-primary hover:bg-hover"
        >
          Thêm lớp học
        </Button>
      </Box>
      <Box sx={{ height: 430, width: '100%' }}>
        <DataGrid
          checkboxSelection
          rows={classes}
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
          getRowId={(classes) => classes._id}
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

export default Class;
