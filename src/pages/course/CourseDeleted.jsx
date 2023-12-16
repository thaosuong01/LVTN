import { Clear } from '@mui/icons-material';
import { Box, Button, Container, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { apiDeleteCourse, apiGetListCourse } from 'apis/course';
import { Path } from 'constants/path';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const CourseDeleted = () => {
  const actionButton = (params) => (
    <div className="flex gap-4">
      <Button onClick={() => handleDelete(params.row._id)} variant="contained" className="bg-primary hover:bg-hover">
        <Clear />
      </Button>
    </div>
  );

  const columns = [
    {
      field: 'course_code',
      headerName: 'Course Code',
      width: 240
    },
    {
      field: 'course_name',
      headerName: 'Course Name',
      width: 300
    },
    {
      field: 'department_id',
      headerName: 'Department',
      width: 340,
      valueGetter: (params) => params.row.department_id?.department_name
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
          await apiDeleteCourse(id);

          Swal.fire('Deleted!', 'The course has been deleted.', 'success');
          fetchCourse();
        } catch (error) {
          Swal.fire('Fail!', 'Delete fail', 'error');
        }
      }
    });
  };
  const [courses, setCourse] = useState([]);
  console.log('courses: ', courses);

  document.title = 'Khóa học';

  const fetchCourse = async () => {
    try {
      const response = await apiGetListCourse();
      const filteredCourses = response.data.filter((cl) => cl.delete);
      setCourse(filteredCourses);
    } catch (error) {
      console.log('Failed to fetch user list: ', error);
    }
  };
  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <Container maxWidth={'lg'}>
      <Box display={'flex'} justifyContent={'space-between'} marginBottom={2}>
        <Typography variant="h2" color="initial">
          Danh sách khóa học
        </Typography>

        <Button
          variant="contained"
          LinkComponent={Link}
          to={Path.Course}
          className="bg-primary hover:bg-hover"
        >
          Danh sách khóa học
        </Button>
      </Box>
      <Box sx={{ height: 430, width: '100%' }}>
        <DataGrid
          checkboxSelection
          rows={courses}
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
          getRowId={(courses) => courses._id}
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

export default CourseDeleted;
