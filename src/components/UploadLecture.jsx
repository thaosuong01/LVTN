import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  InputLabel,
  Modal,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import slugify from "slugify";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { apiAddLectureVideo } from "../api/lecture";

export const fSlug = (text) =>
  slugify(text, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: false, // strip special characters except replacement, defaults to `false`
    locale: "vi", // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });

export function renameFile(originalFile, newName) {
  return new File([originalFile], newName, {
    type: originalFile.type,
    lastModified: originalFile.lastModified,
  });
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh",
  overflowY: "auto",
};

const UploadLecture = ({ handleClose, topicId, classId, open, onClose }) => {
  const onSubmit = async (values) => {

    try {
      values.class_id = classId;
      values.topic_id = topicId;
      const response = await apiAddLectureVideo(values);
      if (response.status === 201) {
        Swal.fire({
          text: "Tải lên thành công!",
          confirmButtonColor: "#ffae00",
        });

        handleClose();
        onClose();
      }
    } catch (error) {
      Swal.fire({
        text: error?.response?.data?.message ?? error?.message,
        confirmButtonColor: "#ffae00",
      });
      console.log(error);
    }
  };

  const initialValues = { title: "", video_link: "", isNotify: false };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Vui lòng nhập tiêu đề"),
    video_link: Yup.string().required("Vui lòng thêm đường dẫn bài giảng"),
  });

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

              <div className="my-8 flex justify-center">
                <h1 className="text-2xl font-bold">Thêm bài giảng</h1>
              </div>
              <div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  validateOnBlur={false}
                  validateOnChange={false}
                  onSubmit={onSubmit}
                  enableReinitialize
                >
                  {({
                    values,
                    touched,
                    handleSubmit,
                    handleChange,
                    errors,
                    getFieldProps,
                  }) => {
                    return (
                      <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                      >
                        <div className="flex justify-center items-center my-2">
                          <InputLabel className="w-[30%]">Tiêu đề</InputLabel>
                          <div className="w-[70%]">
                            <TextField
                              name="title"
                              variant="outlined"
                              value={values?.title}
                              onChange={handleChange}
                              fullWidth
                              error={touched.title && Boolean(errors.title)}
                              helperText={touched.title && errors.title}
                            />
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
                              error={
                                touched.video_link && Boolean(errors.video_link)
                              }
                              helperText={
                                touched.video_link && errors.video_link
                              }
                            />
                          </div>
                        </div>
                        {/* Checkbox for "Thông báo cho sinh viên" */}
                        <div className="flex items-center my-4">
                          <InputLabel className="w-[30%]">
                            Thông báo cho sinh viên
                          </InputLabel>
                          <div className="w-[70%] flex items-center">
                            <Checkbox
                              {...getFieldProps("isNotify")}
                              checked={values.isNotify}
                              onChange={handleChange}
                            />
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
                            Thêm bài giảng
                          </Button>
                        </div>
                      </form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default UploadLecture;
