import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RightNavigate from "../components/RightNavigate";

import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { apiAddClass } from "../api/class";
import { path } from "../utils/path";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const AddCourse = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { departments } = useSelector((state) => state.department);

  const [selectedDepartment, setSelectedDepartment] = useState("");

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const selectedDepartmentCourses =
      departments?.find((item) => item.department_id === selectedDepartment)
        ?.courses || [];
    setCourses(selectedDepartmentCourses);
  }, [selectedDepartment, departments]);

  const onBlurDepartment = (event) => {
    const department = event.target.value;
    setSelectedDepartment(department);
  };

  const initialValues = {
    class_name: "",
    class_code: "",
    class_pass: "",
    display: "",
    department: "",
    course_id: "",
  };

  const validationSchema = Yup.object().shape({
    class_name: Yup.string().required("Vui lòng nhập tên lớp học"),
    class_code: Yup.string().required("Vui lòng nhập mã lớp học"),
    display: Yup.string().required("Vui lòng chọn hiển thị lớp học"),
    department: Yup.string().required("Vui lòng chọn khoa"),
    course_id: Yup.string().required("Vui lòng chọn khóa học"),
  });

  const handleAdd = async (values) => {
    try {
      const response = await apiAddClass(values);

      if (response.status == 200) {
        Swal.fire({
          text: "Thêm lớp học thành công!",
          confirmButtonColor: "#ffae00",
        });
      }

      navigate(`/${path.MANAGECOURSE}/${selectedDepartment}`);
    } catch (error) {
      Swal.fire({
        text: error?.response?.data?.message ?? error?.message,
        confirmButtonColor: "#ffae00",
      });
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="bg-white py-8">
      <div className="flex px-5 gap-4">
        <div className="w-[80%]">
          <Container className="">
            <div className="w-full mb-8">
              <Typography
                variant="h4"
                component="h1"
                align="center"
                className="flex justify-center"
                sx={{ fontWeight: "bold" }}
              >
                Thêm mới lớp học
              </Typography>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={handleAdd}
            >
              {({ values, handleSubmit, handleChange, errors }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <div className="flex justify-center items-center my-2">
                      <InputLabel className="w-[30%]">Tên lớp học</InputLabel>
                      <div className="w-[70%]">
                        <TextField
                          name="class_name"
                          variant="outlined"
                          fullWidth
                          value={values.class_name}
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
                      <InputLabel className="w-[30%]">Mã lớp học</InputLabel>
                      <div className="w-[70%]">
                        <TextField
                          name="class_code"
                          variant="outlined"
                          fullWidth
                          className="text-red-500"
                          value={values.class_code}
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
                      <InputLabel className="w-[30%]">Mật khẩu</InputLabel>
                      <div className="w-[70%]">
                        <OutlinedInput
                          type={showPassword ? "text" : "password"}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          name="class_pass"
                          variant="outlined"
                          fullWidth
                          value={values.class_pass}
                          onChange={handleChange}
                          error={Boolean(errors.class_pass)}
                        />
                        {errors.class_pass && (
                          <span
                            style={{
                              color: "red",
                              textAlign: "left",
                              width: "90%",
                            }}
                            className=""
                          >
                            {errors.class_pass}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-center items-center my-2">
                      <InputLabel className="w-[30%]">Khoa</InputLabel>
                      <div className="w-[70%] flex flex-col">
                        <Select
                          className="w-[70%]"
                          name="department"
                          variant="outlined"
                          onChange={handleChange}
                          value={values.department}
                          error={Boolean(errors.department)}
                          onBlur={onBlurDepartment}
                        >
                          {departments?.map((item, index) => (
                            <MenuItem key={index} value={item?.department_id}>
                              {item?.department}
                            </MenuItem>
                          ))}
                        </Select>

                        {errors.department && (
                          <span
                            style={{
                              color: "red",
                              textAlign: "left",
                              width: "90%",
                            }}
                            className=""
                          >
                            {errors.department}
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
                          value={values.course_id}
                          onChange={handleChange}
                          error={Boolean(errors.course_id)}
                        >
                          {courses.map((course, index) => (
                            <MenuItem key={index} value={course?.id}>
                              {course?.name}
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
                          value={values.display}
                          onChange={handleChange}
                          error={Boolean(errors.display)}
                        >
                          <MenuItem value="true">Mở</MenuItem>
                          <MenuItem value="false">Đóng</MenuItem>
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

                    <div className="my-4 w-full flex justify-center items-center">
                      <Button
                        type="submit"
                        className="w-[30%]"
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
          </Container>
        </div>
        <div className="w-[20%]">
          <RightNavigate></RightNavigate>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
