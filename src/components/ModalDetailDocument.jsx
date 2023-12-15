import { blue } from '@ant-design/colors';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { apiGetDocumentById } from 'apis/document';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const ModalDetailDocument = ({ open, handleClose, documentId }) => {
  const [document, setDocument] = useState({});
  console.log('document: ', document);

  const fetchDocumentById = async (documentId) => {
    try {
      const response = await apiGetDocumentById(documentId);
      setDocument(response?.data?.document);
    } catch (error) {
      console.log('Failed to fetch document list: ', error);
    }
  };
  useEffect(() => {
    fetchDocumentById(documentId);
  }, [documentId]);

  return (
    <>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="flex flex-col">
            <div className="mb-8">
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  top: 1,
                  right: 8,
                  color: 'gray'
                }}
              >
                <ClearIcon />
              </IconButton>

              {/* Nội dung của Modal */}
              <div className="mb-8">
                <Typography align="center" sx={{ fontWeight: 'bold', fontSize: '28px' }}>
                  Chi tiết tài liệu và bài giảng
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Typography>Tiêu đề:</Typography>
                  </Grid>

                  <Grid item xs={8}>
                    <Typography>{document?.title}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>Files:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    {document?.files?.map((item, index) => {
                      return (
                        <div key={index}>
                          <Typography color={blue} component={Link} to={`${process.env.REACT_APP_SERVER_URL}/${item}`}>
                            {item}
                          </Typography>
                        </div>
                      );
                    })}
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>Tên lớp:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    {document?.class_id?.class_name || '(Đã xóa)'}
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ModalDetailDocument;
