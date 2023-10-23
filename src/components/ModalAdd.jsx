import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, Modal, Typography } from "@mui/material";

import { default as React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { path } from "../utils/path";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
};

const ModalAdd = ({ handleClose, topicId, classId, open }) => {
  const navigate = useNavigate();
  console.log(topicId);

  const handleNavigate = (selectedActivity) => {
    if (selectedActivity === "folder") {
      navigate(`/${path.ADDACTIVITY}/folder/${classId}/${topicId}`);
    } else if (selectedActivity === "document") {
      navigate(`/${path.ADDACTIVITY}/document/${classId}/${topicId}`);
    }
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col">
            <div className="mb-8">
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  top: 1,
                  right: 8,
                  color: "gray",
                }}
              >
                <ClearIcon />
              </IconButton>

              {/* Nội dung của Modal */}
              <div className="flex items-center justify-center mb-8">
                <Typography
                  variant="h5"
                  component="h4"
                  align="center"
                  className="w-[70%]"
                  sx={{ fontWeight: "bold" }}
                >
                  Thêm hoạt động hoặc tài nguyên
                </Typography>
              </div>
              <div className="flex gap-4 justify-center items-center">
                <div
                  onClick={() => handleNavigate("folder")}
                  className="cursor-pointer hover:text-hover text-black flex flex-col items-center"
                >
                  <img
                    src="/../src/assets/icons/folder.png"
                    alt=""
                    className="w-20"
                  />
                  <span>Thư mục</span>
                </div>
                <div
                  onClick={() => handleNavigate("lecture")}
                  className="cursor-pointer hover:text-hover text-black flex flex-col items-center"
                >
                  <img
                    src="/../src/assets/icons/book.png"
                    alt=""
                    className="w-20"
                  />
                  <span>Bài giảng</span>
                </div>
                <div
                  onClick={() => handleNavigate("document")}
                  className="cursor-pointer hover:text-hover text-black flex flex-col items-center"
                >
                  <img
                    src="/../src/assets/icons/file.png"
                    alt=""
                    className="w-20"
                  />
                  <span>Tài liệu</span>
                </div>
                <div
                  onClick={() => handleNavigate("practice")}
                  className="cursor-pointer hover:text-hover text-black flex flex-col items-center"
                >
                  <img
                    src="/../src/assets/icons/exercise.png"
                    alt=""
                    className="w-20"
                  />
                  <span>Bài tập</span>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ModalAdd;
