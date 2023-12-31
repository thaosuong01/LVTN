import ClearIcon from "@mui/icons-material/Clear";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  InputLabel,
  Modal,
  TextField,
  styled,
} from "@mui/material";
import { Formik } from "formik";
import Papa from "papaparse";
import React, { useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { apiCreateExamSet, apiUpdateExamSet } from "../api/examSet";

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

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ModalEditExam = ({ handleClose, open, onClose, dataExam }) => {
  const [fileKey, setFileKey] = useState(0);
  const [dataCsv, setDataCsv] = useState([]);
  const [filename, setFilename] = useState(null);
  console.log("filename: ", filename);
  console.log("dataCsv: ", dataCsv);

  const HandleImportCSV = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFilename(file.name);

      //Check type file
      if (file.type !== "text/csv") {
        Swal.fire({ text: "Chỉ chấp nhận file csv!" });
        return;
      }
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true, // Bỏ qua các dòng trống
        encoding: "UTF-8",
        // encoding: "ISO-8859-1",
        complete: async function (result) {
          setFileKey(fileKey + 1);
          let rawCSV = result.data;
          if (rawCSV.length > 0) {
            console.log("Kiểm tra file");
            const transformedData = rawCSV.map((item) => {
              return {
                ...item,
                answers: item.answers.split(",").map((answer) => answer.trim()),
              };
            });
            setDataCsv(transformedData);
          } else {
            Swal.fire({ text: "Không tìm thấy dữ liệu trong file csv" });
          }
        },
      });
    }
  };

  const onSubmit = async (values) => {
    try {
      values.questions = dataCsv;
      console.log("values: ", values);
      const response = await apiUpdateExamSet(dataExam?._id, values);
      console.log("response: ", response);
      if (response.status === 200) {
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

  const initialValues = {
    set_name: dataExam?.set_name || "",
    desc: dataExam?.desc || "",
    attempt_count: dataExam?.attempt_count || 1,
    isNotify: dataExam?.isNotify || false,
  };

  const validationSchema = Yup.object().shape({
    set_name: Yup.string().required("Vui lòng nhập tiêu đề"),
    desc: Yup.string().required("Vui lòng nhập mô tả"),
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
                <h1 className="text-2xl font-bold">Cập nhật mini test</h1>
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
                              name="set_name"
                              variant="outlined"
                              value={values?.set_name}
                              onChange={handleChange}
                              fullWidth
                              error={
                                touched.set_name && Boolean(errors.set_name)
                              }
                              helperText={touched.set_name && errors.set_name}
                            />
                          </div>
                        </div>
                        <div className="flex justify-center items-center my-2">
                          <InputLabel className="w-[30%]">Mô tả</InputLabel>
                          <div className="w-[70%]">
                            <TextField
                              name="desc"
                              variant="outlined"
                              fullWidth
                              value={values?.desc}
                              onChange={handleChange}
                              error={touched.desc && Boolean(errors.desc)}
                              helperText={touched.desc && errors.desc}
                            />
                          </div>
                        </div>
                        <div className="flex justify-center items-center my-2">
                          <InputLabel className="w-[30%]">
                            Số lần thi
                          </InputLabel>
                          <div className="w-[70%]">
                            <TextField
                              name="attempt_count"
                              variant="outlined"
                              fullWidth
                              type="number"
                              InputProps={{ inputProps: { min: 0, max: 10 } }}
                              value={values?.attempt_count}
                              onChange={handleChange}
                              error={
                                touched.attempt_count &&
                                Boolean(errors.attempt_count)
                              }
                              helperText={
                                touched.attempt_count && errors.attempt_count
                              }
                            />
                          </div>
                        </div>
                        <div className="flex justify-center items-center my-2">
                          <InputLabel className="w-[30%]">File csv</InputLabel>
                          <div className="w-[70%] space-x-2">
                            <Button
                              component="label"
                              variant="contained"
                              startIcon={<CloudUploadIcon />}
                            >
                              Import
                              <VisuallyHiddenInput
                                key={fileKey}
                                onChange={(e) => HandleImportCSV(e)}
                                type="file"
                              />
                            </Button>
                            <span>{filename || ""}</span>
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
                            Cập nhật mini test
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

export default ModalEditExam;
