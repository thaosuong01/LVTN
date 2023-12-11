import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { Formik } from "formik";

import { default as React } from "react";

import * as Yup from "yup";

import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { apiCreateTopic, apiGetTopicByClass } from "../api/topic";
import { apiAddStudentToClass, apiCreateEnrol } from "../api/enrol";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
};

const ModalAddUser = ({ handleClose, open, classId }) => {
  const initialValues = { username: "" };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Vui lòng nhập tên đăng nhập."),
  });

  const onSubmit = async (values) => {
    values.class_id = classId;

    try {
      const response = await apiAddStudentToClass(values);
      console.log("response: ", response);
      if (response.status === 201) {
        Swal.fire({
          text: "Thêm sinh viên vào lớp thành công!",
          confirmButtonColor: "#ffae00",
        });
        handleClose();
        // .then(() => navigate(`/${path.CLASSPAGE}/${cid}`));
      }
    } catch (error) {
      Swal.fire({
        text: error?.response?.data?.message ?? error?.message,
        confirmButtonColor: "#ffae00",
      });
      handleClose();
      console.log(error);
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
              <div className="flex items-center justify-center">
                <Typography
                  variant="h5"
                  component="h4"
                  align="center"
                  className="w-[70%]"
                  sx={{ fontWeight: "bold" }}
                >
                  Thêm sinh viên vào lớp học
                </Typography>
              </div>
            </div>
            <div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={onSubmit}
              >
                {({ values, handleSubmit, handleChange, errors }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <div className="flex justify-center items-center my-2">
                        <InputLabel className="w-[30%]">
                          Tên đăng nhập
                        </InputLabel>
                        <div className="w-[70%]">
                          <TextField
                            name="username"
                            variant="outlined"
                            fullWidth
                            value={values?.username}
                            onChange={handleChange}
                            error={Boolean(errors.username)}
                          />
                          {errors.username && (
                            <span
                              style={{
                                color: "red",
                                textAlign: "left",
                                width: "90%",
                              }}
                              className=""
                            >
                              {errors.username}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="my-4 flex justify-center">
                        <Button
                          type="submit"
                          sx={{
                            backgroundColor: "#ffae00",
                            "&:hover": { backgroundColor: "#ff9500" },
                            color: "white",
                          }}
                        >
                          Thêm
                        </Button>
                      </div>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ModalAddUser;
