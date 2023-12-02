import { AddCircleOutlined, Clear, EditOutlined } from '@mui/icons-material';
import { Box, Button, Container, Typography, styled } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { apiCreateManyStudent, apiDeleteUser, apiGetListUser } from 'apis/user';
import { Path } from 'constants/path';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Papa from 'papaparse';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});

const Student = () => {
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
  const [fileKey, setFileKey] = useState(0);

  document.title = 'Danh sách sinh viên';

  const fetchUser = async () => {
    try {
      const response = await apiGetListUser();
      // console.log('response?.data: ', response?.data);
      setUsers(response?.data?.filter((item) => item?.role_id?.role_name === 'Student'));
    } catch (error) {
      console.log('Failed to fetch user list: ', error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const HandleImportCSV = (e) => {
    console.log('e: ', e.target.files[0]);
    if (e.target && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      //Check type file
      if (file.type !== 'text/csv') {
        Swal.fire({ text: 'Chỉ chấp nhận file csv!' });
        return;
      }
      Papa.parse(file, {
        // header: true,
        complete: async function (result) {
          let rawCSV = result.data;
          if (rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV[0].length === 4) {
              if (rawCSV[0][0] !== 'fullname' || rawCSV[0][1] !== 'username' || rawCSV[0][2] !== 'email' || rawCSV[0][3] !== 'password') {
                Swal.fire({ text: 'Lỗi định dạng tiêu đề trong file csv' });
              } else {
                let result = [];
                rawCSV.map((item, index) => {
                  if (index > 0 && item.length === 4) {
                    let obj = {};
                    obj.fullname = item[0];
                    obj.username = item[1];
                    obj.email = item[2];
                    obj.password = item[3];
                    result.push(obj);
                  }
                });

                try {
                  const response = await apiCreateManyStudent(result);
                  console.log('response: ', response);
                  if (response.status === 201) {
                    Swal.fire({ text: 'Tạo sinh viên thành công' });
                    fetchUser();
                    setFileKey(fileKey + 1);
                  }
                } catch (error) {
                  console.log('error: ', error);
                  Swal.fire({ text: 'Đã có lỗi xãy ra' });
                  setFileKey(fileKey + 1);
                }
              }
            }
          } else {
            Swal.fire({ text: 'Không tìm thấy dữ liệu trong file csv' });
          }
        }
      });
    }
  };

  return (
    <Container maxWidth={'lg'}>
      <Box display={'flex'} justifyContent={'space-between'} marginBottom={2}>
        <Typography variant="h2" color="initial">
          Danh sách Sinh viên
        </Typography>

        <Box>
          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            Upload file
            <VisuallyHiddenInput key={fileKey} onChange={(e) => HandleImportCSV(e)} type="file" />
          </Button>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlined />}
            LinkComponent={Link}
            to={Path.UserAdd}
            className="bg-primary hover:bg-hover"
          >
            Thêm Sinh viên
          </Button>
        </Box>
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
            },
            csvOptions: {
              utf8WithBom: true,
              fileName: 'Danh-sach-sinh-vien',
              delimiter: ','
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

export default Student;
