import { Clear } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, Container, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { apiDeleteDocument, apiGetListDocument } from 'apis/document';
import ModalDetailDocument from 'components/ModalDetailDocument';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Document = () => {
  const [openModal, setOpenModal] = useState(false);
  const [documentId, setDocumentId] = useState([]);

  const handleOpenModal = (id) => {
    setOpenModal(true);
    setDocumentId(id);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const actionButton = (params) => (
    <div className="flex gap-4">
      <Button onClick={() => handleOpenModal(params.row._id)} variant="contained" className="bg-primary hover:bg-hover">
        <VisibilityIcon />
      </Button>
      <Button onClick={() => handleDelete(params.row._id)} variant="contained" className="bg-primary hover:bg-hover">
        <Clear />
      </Button>
    </div>
  );

  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      width: 200
    },
    {
      field: 'files',
      headerName: 'Files',
      width: 460
    },
    {
      field: 'class_id',
      headerName: 'Class Name',
      width: 260,
      valueGetter: (params) => params.row.class_id?.class_name || '(Đã xóa)'
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
    console.log('id: ', id);
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
          await apiDeleteDocument(id);

          Swal.fire('Deleted!', 'The document has been deleted.', 'success');
          fetchDocument();
        } catch (error) {
          Swal.fire('Fail!', 'Delete fail', 'error');
        }
      }
    });
  };
  const [documents, setDocuments] = useState([]);

  document.title = 'Tài liệu và bài giảng';

  const fetchDocument = async () => {
    try {
      const response = await apiGetListDocument();
      setDocuments(response?.data?.documents);
    } catch (error) {
      console.log('Failed to fetch class list: ', error);
    }
  };
  useEffect(() => {
    fetchDocument();
  }, []);

  return (
    <>
      <Container maxWidth={'lg'}>
        <Box display={'flex'} justifyContent={'space-between'} marginBottom={2}>
          <Typography variant="h2" color="initial">
            Danh sách tài liệu và bài giảng
          </Typography>
        </Box>
        <Box sx={{ height: 430, width: '100%' }}>
          <DataGrid
            checkboxSelection
            rows={documents}
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
            getRowId={(documents) => documents._id}
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
      {openModal && <ModalDetailDocument open={openModal} handleClose={handleCloseModal} documentId={documentId} />}
    </>
  );
};

export default Document;
