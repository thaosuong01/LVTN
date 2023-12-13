import React, { useEffect, useState } from "react";
import RightNavigate from "../components/RightNavigate";
import {
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { apiGetClassById } from "../api/class";
import { apiCreateEnrol } from "../api/enrol";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { path } from "../utils/path";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const EnrolmentPage = () => {
  const navigate = useNavigate();

  const { cid } = useParams();

  const [classes, setClasses] = useState([]);

  const fetchClassById = async () => {
    try {
      const response = await apiGetClassById(cid);

      setClasses(response?.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchClassById();
  }, [cid]);

  const onSubmit = async (values) => {
    values.class_id = cid;

    try {
      const response = await apiCreateEnrol(values);
      if (response.status === 201) {
        Swal.fire({
          text: "Ghi danh thành công!",
          confirmButtonColor: "#ffae00",
        }).then(() => navigate(`/${path.CLASSPAGE}/${cid}`));
      }
    } catch (error) {
      Swal.fire({
        text: error?.response?.data?.message ?? error?.message,
        confirmButtonColor: "#ffae00",
      });
      console.log(error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="bg-white py-8">
        <div className="flex gap-8 px-5">
          <div className="w-[80%]">
            <h1 className="font-bold text-2xl">Ghi danh vào lớp học</h1>
            <div className="flex flex-col justify-center w-[40%] mx-auto my-4">
              <Formik
                initialValues={{ class_pass: "" }}
                validationSchema={Yup.object().shape({
                  class_pass:
                    classes?.class_pass &&
                    Yup.string().required("Vui lòng nhập mật khẩu"),
                })}
                onSubmit={onSubmit}
              >
                {({ handleSubmit, handleChange, errors, values, touched }) => {
                  return (
                    <Form noValidate onSubmit={handleSubmit}>
                      {classes?.class_pass && (
                        <div>
                          <InputLabel htmlFor="outlined-adornment-password">
                            Password
                          </InputLabel>
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
                            id="outlined-adornment-password"
                            name="class_pass"
                            value={values.class_pass}
                            onChange={handleChange}
                            className="w-full bg-[#fefefe]"
                          />
                          <ErrorMessage name="class_pass">
                            {(msg) => (
                              <FormHelperText error>{msg}</FormHelperText>
                            )}
                          </ErrorMessage>
                        </div>
                      )}
                      <button
                        className="w-24 py-1 mx-auto flex justify-center my-4 bg-button hover:bg-[#5b9608] text-white transition-all ease-in-out duration-150"
                        type="submit"
                      >
                        Enrol
                      </button>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
          <div className="w-[20%]">
            <RightNavigate></RightNavigate>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnrolmentPage;
