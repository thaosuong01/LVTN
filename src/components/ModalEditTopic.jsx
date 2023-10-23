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
import { useEffect, useState } from "react";

import { Formik } from "formik";

import { default as React } from "react";

import * as Yup from "yup";

import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  apiGetTopicByClass,
  apiGetTopicById,
  apiUpdateTopic,
} from "../api/topic";

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

const ModalEditTopic = ({ handleClose, topicId, open, classId, setTopics }) => {
  const [initialValues, setInitialValues] = useState({
    topic_name: "",
    topic_type: "",
  });
  const fetchTopicById = async () => {
    try {
      const response = await apiGetTopicById(topicId);
      setInitialValues(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTopicById();
  }, [topicId]);

  const validationSchema = Yup.object().shape({
    topic_name: Yup.string().required("Vui lòng nhập tên tiêu đề"),
    topic_type: Yup.string().required("Vui lòng chọn kiểu tiêu đề"),
  });

  async function getTopic() {
    const topics = await apiGetTopicByClass(classId);
    setTopics(topics?.data);
  }

  const onSubmit = async (values) => {
    try {
      const response = await apiUpdateTopic(topicId, values);
      console.log(response);

      if (response.status == 201) {
        Swal.fire({
          text: "Cập nhật thành công!",
          confirmButtonColor: "#ffae00",
        });

        getTopic();

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

  const { types } = useSelector((state) => state.topic);
  console.log(types);

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
                  Chỉnh sửa chủ đề
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
                        <InputLabel className="w-[30%]">
                          Tên khóa học
                        </InputLabel>
                        <div className="w-[70%]">
                          <TextField
                            name="topic_name"
                            variant="outlined"
                            fullWidth
                            value={values?.topic_name}
                            onChange={handleChange}
                            error={Boolean(errors.topic_name)}
                          />
                          {errors.topic_name && (
                            <span
                              style={{
                                color: "red",
                                textAlign: "left",
                                width: "90%",
                              }}
                              className=""
                            >
                              {errors.topic_name}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-center items-center my-2">
                        <InputLabel className="w-[30%]">
                          Kiểu tiêu đề
                        </InputLabel>
                        <div className="w-[70%] flex flex-col">
                          <Select
                            className="w-[70%]"
                            name="topic_type"
                            variant="outlined"
                            value={values?.topic_type || ""}
                            onChange={handleChange}
                            error={Boolean(errors.topic_type)}
                          >
                            {types?.map((type, index) => (
                              <MenuItem key={index} value={type}>
                                {type}
                              </MenuItem>
                            ))}
                          </Select>

                          {errors.topic_type && (
                            <span
                              style={{
                                color: "red",
                                textAlign: "left",
                                width: "90%",
                              }}
                              className=""
                            >
                              {errors.topic_type}
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

export default ModalEditTopic;
