import ClearIcon from "@mui/icons-material/Clear";
import { Button, IconButton, InputLabel, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import { Formik } from "formik";

import { default as React } from "react";

import { useEffect, useState } from "react";
import {
  apiGetExerciseSubmitById,
  apiGradeAndComment,
} from "../api/exerciseSubmit";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalGrading = ({ open, handleClose, exerciseId }) => {
  const [exerciseSubmit, setExerciseSubmit] = useState([]);
  console.log("exerciseSubmit: ", exerciseSubmit);

  const fetchGetExerciseSubmitById = async () => {
    const response = await apiGetExerciseSubmitById(exerciseId);
    setExerciseSubmit(response?.data);
  };

  useEffect(() => {
    fetchGetExerciseSubmitById();
  }, [exerciseId]);

  const initialValues = { grade: "", comment: "" };

  const onSubmit = async (values) => {
    try {
      const response = await apiGradeAndComment(exerciseId, values);
      if (response.status == 201) {
        Swal.fire({
          text: "Đã chấm điểm!",
          confirmButtonColor: "#ffae00",
        });

        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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
            </div>
            <div>
              <div className="flex mb-6">
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ width: "50%", fontWeight: "bold" }}
                >
                  {exerciseSubmit?.student_id?.fullname}
                </Typography>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ width: "50%", fontWeight: "bold" }}
                >
                  {exerciseSubmit?.student_id?.account_id?.username}
                </Typography>
              </div>
              <div className="flex items-center my-2">
                <Typography id="modal-modal-description" sx={{ width: "50%" }}>
                  File đã nộp:
                </Typography>
                <Link
                  to={`${import.meta.env.VITE_SERVER_URL}/exercise-submit/${
                    exerciseSubmit?.files
                  }`}
                  sx={{ width: "50%" }}
                  className="hover:text-hover"
                >
                  {exerciseSubmit?.files}
                </Link>
              </div>
              <div className="my-4">
                <Formik
                  initialValues={initialValues}
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
                          <InputLabel className="w-[50%]">
                            Chấm điểm:
                          </InputLabel>
                          <div className="w-[50%] flex items-center">
                            <TextField
                              className="w-[10%]"
                              name="grade"
                              value={values?.grade}
                              onChange={handleChange}
                              id="standard-basic"
                              variant="standard"
                            />
                            <span>/10</span>
                          </div>
                        </div>
                        <div className="flex justify-center items-center my-2">
                          <InputLabel className="w-[50%]">Nhận xét:</InputLabel>
                          <TextField
                            name="comment"
                            variant="outlined"
                            className="w-[50%]"
                            value={values?.comment}
                            onChange={handleChange}
                          />
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
                            Lưu
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
    </div>
  );
};

export default ModalGrading;
