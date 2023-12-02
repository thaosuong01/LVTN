import ClearIcon from "@mui/icons-material/Clear";
import {
    Box,
    Button,
    IconButton,
    InputLabel,
    Modal,
    TextField,
    Typography
} from "@mui/material";
import { useEffect, useState } from "react";

import { Formik } from "formik";

import { default as React } from "react";

import * as Yup from "yup";

import Swal from "sweetalert2";
import { apiGetLectureById, apiUpdateLectureVideo } from "../api/lecture";

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

const ModalEditLecture = ({ handleClose, open, lectureId }) => {
  const [initialValues, setInitialValues] = useState({
    title: "",
    video_link: "",
  });

  console.log(initialValues);

  const fetchLectureById = async () => {
    try {
      const response = await apiGetLectureById(lectureId);
      setInitialValues(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLectureById();
  }, [lectureId]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Vui lòng nhập tên tiêu đề"),
    video_link: Yup.string().required("Vui lòng thêm đường dẫn bài giảng"),
  });

  const onSubmit = async (values) => {
    try {
      const response = await apiUpdateLectureVideo(lectureId, values);
      console.log(response);

      if (response.status == 200) {
        Swal.fire({
          text: "Cập nhật thành công!",
          confirmButtonColor: "#ffae00",
        });

        handleClose();
      }
    } catch (error) {
      Swal.fire({
        text: error?.response?.data?.message ?? error?.message,
        confirmButtonColor: "#ffae00",
      });
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
                  Chỉnh sửa bài giảng
                </Typography>
              </div>
            </div>
            <div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                validateOnBlur={false}
                validateOnChange={false}
                enableReinitialize
                onSubmit={onSubmit}
              >
                {({ values, handleSubmit, handleChange, errors }) => {
                  console.log("errors: ", errors);
                  return (
                    <form onSubmit={handleSubmit}>
                      <div className="flex justify-center items-center my-2">
                        <InputLabel className="w-[30%]">Tiêu đề</InputLabel>
                        <div className="w-[70%]">
                          <TextField
                            name="title"
                            variant="outlined"
                            fullWidth
                            value={values?.title}
                            onChange={handleChange}
                            error={Boolean(errors.title)}
                          />
                          {errors.title && (
                            <span
                              style={{
                                color: "red",
                                textAlign: "left",
                                width: "90%",
                              }}
                              className=""
                            >
                              {errors.title}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-center items-center my-2">
                        <InputLabel className="w-[30%]">
                          Link bài giảng
                        </InputLabel>
                        <div className="w-[70%]">
                          <TextField
                            name="video_link"
                            variant="outlined"
                            fullWidth
                            value={values?.video_link}
                            onChange={handleChange}
                            error={Boolean(errors.video_link)}
                          />
                          {errors.video_link && (
                            <span
                              style={{
                                color: "red",
                                textAlign: "left",
                                width: "90%",
                              }}
                              className=""
                            >
                              {errors.video_link}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="my-4">
                        <Button
                          type="submit"
                          fullWidth
                          sx={{
                            backgroundColor: "#ffae00",
                            "&:hover": { backgroundColor: "#ff9500" },
                            color: "white",
                          }}
                        >
                          Cập nhật
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

export default ModalEditLecture;
