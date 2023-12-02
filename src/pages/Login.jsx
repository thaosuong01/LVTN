import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import jwt_decode from "jwt-decode";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { apiLogin } from "../api/auth.js";
import { login, setAccessToken } from "../redux/authSlice.js";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [rememberUsername, setRememberUsername] = useState(false);

  const handleCheckboxChange = (event) => {
    setRememberUsername(event.target.checked);
  };

  const handleLogin = async (values) => {
    try {
      const response = await apiLogin(values);

      if (response.status == 200) {
        const data = await jwt_decode(response.data.jwtToken);
        dispatch(login(data));
        dispatch(setAccessToken(response.data.jwtToken));
        localStorage.setItem("access_token", response.data.jwtToken);
        navigate("/");
      } else {
        Swal.fire({
          text: "Username or password is incorrect",
          confirmButtonColor: "#ffae00",
        });
      }
    } catch (error) {
      Swal.fire({
        text: "Username or password is incorrect",
        confirmButtonColor: "#ffae00",
      });
      console.log(error);
    }
  };

  return (
    <div className="bg-white py-8">
      <h2 className="text-center text-second font-bold text-3xl mb-5">
        Welcome to E-learning!
      </h2>
      <div className="flex items-center justify-center pb-5">
        <div className="bg-[#eee] w-2/5 py-6">
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={Yup.object().shape({
              username: Yup.string().required("Username is required."),
              password: Yup.string()
                .max(32)
                .min(8)
                .required("Password is required."),
            })}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={handleLogin}
          >
            {({ values, handleSubmit, handleChange, errors }) => (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center"
              >
                <TextField
                  label="Username"
                  sx={{ m: 1, width: "90%" }}
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  error={Boolean(errors.username)}
                  className="w-full bg-[#fefefe]"
                />
                {errors.username && (
                  <span
                    style={{ color: "red", textAlign: "left", width: "90%" }}
                    className=""
                  >
                    {errors.username}
                  </span>
                )}

                <FormControl sx={{ m: 1, width: "90%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    error={Boolean(errors.password)}
                    className="w-full bg-[#fefefe]"
                  />
                </FormControl>
                {errors.password && (
                  <span
                    style={{ color: "red", textAlign: "left", width: "90%" }}
                  >
                    {errors.password}
                  </span>
                )}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberUsername}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="Remember username"
                  style={{ color: "#555", textAlign: "left", width: "90%" }}
                />
                <button
                  type="submit"
                  className="bg-primary w-full text-white text-base px-6 py-2.5 hover:bg-hover transition-all ease-in my-2"
                  style={{ width: "90%" }}
                >
                  Log in
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
