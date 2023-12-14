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
import { default as React, useEffect, useState } from "react";
import { apiGetClassById, apiUpdateClass } from "../api/class";

import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { apiGetCourseByDepartment } from "../api/course";

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

const ModalEditCourse = ({ handleClose, classId, open }) => {
  const [initialValues, setInitialValues] = useState({
    class_name: "",
    class_code: "",
    class_pass: "",
    display: "",
    course_id: "",
  });
  

  const fetchClassById = async () => {
    try {
      const response = await apiGetClassById(classId);

      setInitialValues({
        class_code:response.data.class_code,
        class_name:response.data.class_name,
        display:response.data.display,
        course_id: response.data.course_id._id,
      });
    } catch (error) {}
  };

  useEffect(() => {
    fetchClassById();
  }, [classId]);

  const [courses, setCourses] = useState([]);
  
  const { did } = useParams();

  const fetchCourse = async () => {
    try {
      const response = await apiGetCourseByDepartment(did);
      setCourses(response?.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchCourse();
  }, [did]);

  const validationSchema = Yup.object().shape({
    class_name: Yup.string().required("Vui lòng nhập tên lớp học"),
    class_code: Yup.string().required("Vui lòng nhập mã lớp học"),
    display: Yup.string().required("Vui lòng chọn hiển thị lớp học"),
  });

  const onSubmit = async (values) => {
    try {
      const response = await apiUpdateClass(values, classId);

      if (response.status == 201) {
        Swal.fire({
          text: "Cập nhật lớp học thành công!",
          confirmButtonColor: "#ffae00",
        });
        handleClose();
      }
    } catch (error) {
      Swal.fire({
        text: error?.response?.data?.message ?? error?.message,
        confirmButtonColor: "#ffae00",
      });
      
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
                  Chỉnh sửa thông tin lớp học
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
                  console.log('values: ', values);
                  
                  return (
                    <form onSubmit={handleSubmit}>
                      <div className="flex justify-center items-center my-2">
                        <InputLabel className="w-[30%]">Tên lớp học</InputLabel>
                        <div className="w-[70%]">
                          <TextField
                            name="class_name"
                            variant="outlined"
                            fullWidth
                            value={values?.class_name}
                            onChange={handleChange}
                            error={Boolean(errors.class_name)}
                          />
                          {errors.class_name && (
                            <span
                              style={{
                                color: "red",
                                textAlign: "left",
                                width: "90%",
                              }}
                              className=""
                            >
                              {errors.class_name}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-center items-center my-2">
                        <InputLabel className="w-[30%]">
                          Mã số lớp học
                        </InputLabel>
                        <div className="w-[70%]">
                          <TextField
                            name="class_code"
                            variant="outlined"
                            fullWidth
                            className="text-red-500"
                            value={values?.class_code}
                            onChange={handleChange}
                            error={Boolean(errors.class_code)}
                          />

                          {errors.class_code && (
                            <span
                              style={{
                                color: "red",
                                textAlign: "left",
                                width: "90%",
                              }}
                              className=""
                            >
                              {errors.class_code}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-center items-center my-2">
                        <InputLabel className="w-[30%]">Khóa học</InputLabel>
                        <div className="w-[70%] flex flex-col">
                          <Select
                            className="w-[70%]"
                            name="course_id"
                            variant="outlined"
                            value={values?.course_id || ""}
                            onChange={handleChange}
                            error={Boolean(errors.course_id)}
                          >
                            {courses.map((course, index) => (
                              <MenuItem key={index} value={course?._id}>
                                {course?.course_name}
                              </MenuItem>
                            ))}
                          </Select>

                          {errors.course_id && (
                            <span
                              style={{
                                color: "red",
                                textAlign: "left",
                                width: "90%",
                              }}
                              className=""
                            >
                              {errors.course_id}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-center items-center my-2">
                        <InputLabel className="w-[30%]">
                          Hiển thị lớp học
                        </InputLabel>
                        <div className="w-[70%] flex flex-col">
                          <Select
                            className="w-[70%]"
                            name="display"
                            variant="outlined"
                            value={values?.display || false}
                            onChange={handleChange}
                            error={Boolean(errors.display)}
                          >
                            <MenuItem value={true}>Mở</MenuItem>
                            <MenuItem value={false}>Đóng</MenuItem>
                          </Select>

                          {errors.display && (
                            <span
                              style={{
                                color: "red",
                                textAlign: "left",
                                width: "90%",
                              }}
                              className=""
                            >
                              {errors.display}
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

export default ModalEditCourse;
