import ClearIcon from "@mui/icons-material/Clear";
import {
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  MobileTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { ErrorMessage, Formik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useParams } from "react-router-dom";
import slugify from "slugify";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { apiGetExerciseById, apiUpdateExerciseById } from "../api/exercise";
import RightNavigate from "../components/RightNavigate";

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

const UpdatePractice = () => {
  const [files, setFiles] = useState([]);
  console.log("files: ", files);
  // const [rejected, setRejected] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    console.log("acceptedFiles: ", acceptedFiles);
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [...previousFiles, ...acceptedFiles]);
    }

    // if (rejectedFiles?.length) {
    //   setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    // }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/png": [], "application/pdf": [] },
    // maxSize: 1000000,
    onDrop,
  });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const removeFile = (path) => {
    setFiles((files) => files.filter((file) => file.path !== path));
  };

  const removeAll = () => {
    setFiles([]);
  };

  // const removeRejected = (path) => {
  //   setRejected((files) => files.filter(({ file }) => file.path !== path));
  // };

  const { eid } = useParams();

  const [initialValues, setInitialValues] = useState({
    title: "",
    start_date: "",
    start_time: "",
    deadline_date: "",
    deadline_time: "",
    display: false,
    files: "",
  });

  const getExerciseById = async (eid) => {
    try {
      const response = await apiGetExerciseById(eid);
      const data = response?.data;
      setInitialValues({
        ...data,
        start_date: data.start_time,
        deadline_time: data.deadline,
        deadline_date: data.deadline,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExerciseById(eid);
  }, [eid]);

  const handleRemoveCurrentFile = (file, values) => {
    setInitialValues({
      ...values,
      files: initialValues.files?.filter((item) => item !== file),
    });
  };

  const onSubmit = async (values, { setErrors }) => {
    const {
      start_date,
      start_time,
      deadline_date,
      deadline_time,
      title,
      display,
    } = values;

    const startDate = dayjs(start_date).format("YYYY-MM-DD");

    const startTime = dayjs(start_time).format("HH:mm");
    const dateTimeStart = `${startDate} ${startTime}:00`;

    const deadlineDate = dayjs(deadline_date).format("YYYY-MM-DD");
    const deadlineTime = dayjs(deadline_time).format("HH:mm");
    const dateTimeDeadline = `${deadlineDate} ${deadlineTime}:00`;

    const start = dayjs(dateTimeStart);
    const end = dayjs(dateTimeDeadline);
    const currenDate = dayjs();

    const compare = start.diff(end, "minutes");
    const compareWithCurrentDate = start.diff(currenDate, "minutes");

    if (compare >= 0) {
      setErrors({ start_date: "Thời gian bắt đầu phải hơn dealine" });
      return;
    }

    // if (compareWithCurrentDate <= 0) {
    //   setErrors({
    //     start_time: "Thời gian bắt đầu phải lớn hơn thời gian hiện tại.",
    //   });
    //   return;
    // }
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", renameFile(file, fSlug(file.name)));
      });

      formData.append("title", title);
      formData.append("display", display);
      formData.append("start_time", dateTimeStart);
      formData.append("deadline", dateTimeDeadline);
      formData.append("newFiles", values.files);

      const response = await apiUpdateExerciseById(eid, formData);
      console.log("response: ", response);
      if (response.status === 200) {
        Swal.fire({
          text: "Tải lên thành công!",
          confirmButtonColor: "#ffae00",
        }).then(() => {
          getExerciseById(eid);
          setFiles([]);
        });
      }
    } catch (error) {
      Swal.fire({
        text: error?.response?.data?.message ?? error?.message,
        confirmButtonColor: "#ffae00",
      });
      console.log(error);
    }
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Vui lòng nhập tiêu đề"),
    start_date: Yup.date().required(
      "Vui lòng nhập thời gian bắt đầu được truy cập"
    ),
    start_time: Yup.date().required(
      "Vui lòng nhập thời gian bắt đầu được truy cập"
    ),
    deadline_date: Yup.date().required("Vui lòng nhập hạn chót"),
    deadline_time: Yup.date().required("Vui lòng nhập hạn chót"),
    display: Yup.boolean().required("Vui lòng nhập hiển thị"),
  });

  return (
    <>
      <div className="bg-white py-8">
        <div className="flex gap-8 px-5">
          <div className="w-[80%]">
            <div className="flex justify-center pb-4">
              <h1 className="text-2xl font-bold">Thêm bài tập</h1>
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
                  touched,
                  handleSubmit,
                  getFieldProps,
                  errors,
                  values,
                  handleChange,
                  setFieldValue,
                }) => {
                  return (
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                      <div className="flex justify-center items-center my-2">
                        <InputLabel className="w-[30%]">Tiêu đề</InputLabel>
                        <div className="w-[70%]">
                          <TextField
                            name="title"
                            variant="outlined"
                            fullWidth
                            {...getFieldProps("title")}
                            onChange={handleChange}
                            value={values.title}
                          />
                          <ErrorMessage name="title">
                            {(msg) => (
                              <FormHelperText error>{msg}</FormHelperText>
                            )}
                          </ErrorMessage>
                        </div>
                      </div>

                      <div className="flex items-center my-4">
                        <InputLabel className="w-[30%]">
                          Thời gian bắt đầu được truy cập
                        </InputLabel>
                        <div className="flex gap-8">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div className="flex flex-col">
                              <DatePicker
                                value={dayjs(values.start_date) ?? dayjs()}
                                onChange={(newValue) =>
                                  setFieldValue("start_date", newValue)
                                }
                              />
                              <ErrorMessage name="start_date">
                                {(msg) => (
                                  <FormHelperText error>{msg}</FormHelperText>
                                )}
                              </ErrorMessage>
                            </div>

                            <div className="flex flex-col">
                              <MobileTimePicker
                                onChange={(newValue) =>
                                  setFieldValue("start_time", newValue)
                                }
                                value={dayjs(values.start_time) ?? dayjs()}
                              />
                              <ErrorMessage name="start_time">
                                {(msg) => (
                                  <FormHelperText error>{msg}</FormHelperText>
                                )}
                              </ErrorMessage>
                            </div>
                          </LocalizationProvider>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <InputLabel className="w-[30%]">Hạn chót</InputLabel>
                        <div className="flex gap-8">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div className="flex flex-col">
                              <DatePicker
                                onChange={(newValue) =>
                                  setFieldValue("deadline_date", newValue)
                                }
                                value={dayjs(values.deadline_date) ?? dayjs()}
                              />
                              <ErrorMessage name="deadline_date">
                                {(msg) => (
                                  <FormHelperText error>{msg}</FormHelperText>
                                )}
                              </ErrorMessage>
                            </div>
                            <div className="flex flex-col">
                              <MobileTimePicker
                                onChange={(newValue) =>
                                  setFieldValue("deadline_time", newValue)
                                }
                                value={dayjs(values.deadline_time) ?? dayjs()}
                              />
                              <ErrorMessage name="deadline_time">
                                {(msg) => (
                                  <FormHelperText error>{msg}</FormHelperText>
                                )}
                              </ErrorMessage>
                            </div>
                          </LocalizationProvider>
                        </div>
                      </div>
                      <div className="flex items-center my-4">
                        <InputLabel className="w-[30%]">Hiển thị</InputLabel>
                        <div className="w-[70%] flex flex-col">
                          <Select
                            className="w-[30%]"
                            name="display"
                            variant="outlined"
                            value={values.display || false}
                            onChange={handleChange}
                          >
                            <MenuItem value={true}>Mở</MenuItem>
                            <MenuItem value={false}>Đóng</MenuItem>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <InputLabel>Tài liệu</InputLabel>
                        <div
                          className="p-16 mt-2 border border-neutral-200 cursor-pointer"
                          {...getRootProps({})}
                        >
                          <input {...getInputProps()} />
                          <div className="flex flex-col items-center justify-center gap-4">
                            <img
                              src="/../src/assets/icons/upload-icon.png"
                              alt=""
                              width={100}
                            />
                            {isDragActive ? (
                              <p>Drop the PDF files here</p>
                            ) : (
                              <p>
                                Drag & drop PDF files here, or click to select
                                files
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Preview */}
                        <section className="mt-10">
                          <div className="flex gap-4">
                            <h2 className="title text-3xl font-semibold">
                              Preview
                            </h2>
                            <button
                              type="button"
                              onClick={removeAll}
                              className="mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-neutral-700 transition-colors"
                            >
                              Remove all files
                            </button>
                            <button
                              type="submit"
                              className="ml-auto mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-[#90c446] rounded-md px-3 hover:bg-[#5b9608] hover:text-white transition-colors"
                            >
                              Upload Files
                            </button>
                          </div>

                          {/** Current files */}
                          <h3 className="title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3">
                            Current Files
                          </h3>
                          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 mb-5">
                            {values?.files.length > 0 &&
                              values?.files?.map((file) => (
                                <li
                                  key={file}
                                  className="relative h-32 rounded-md shadow-lg"
                                >
                                  <img
                                    src="/../src/assets/icons/pdf-icon.png"
                                    alt="PDF Icon"
                                    className="h-full w-full object-contain rounded-md"
                                  />
                                  <button
                                    type="button"
                                    className="w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors"
                                    onClick={() =>
                                      handleRemoveCurrentFile(file, values)
                                    }
                                  >
                                    <ClearIcon className="w-5 h-5 fill-white hover:fill-secondary-400 transition-colors" />
                                  </button>
                                  <span>{file}</span>
                                </li>
                              ))}
                          </ul>

                          {/* Accepted files */}
                          {files?.length > 0 && (
                            <div>
                              <h3 className="title text-lg font-semibold text-neutral-600 mt-14 border-b pb-3">
                                Accepted Files
                              </h3>
                              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10 mb-5">
                                {files.map((file) => (
                                  <li
                                    key={file.path}
                                    className="relative h-32 rounded-md shadow-lg mb-5"
                                  >
                                    <img
                                      src="/../src/assets/icons/pdf-icon.png"
                                      alt="PDF Icon"
                                      className="h-full w-full object-contain rounded-md"
                                    />
                                    <button
                                      type="button"
                                      className="w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors"
                                      onClick={() => removeFile(file.path)}
                                    >
                                      <ClearIcon className="w-5 h-5 fill-white hover:fill-secondary-400 transition-colors" />
                                    </button>
                                    <span>{file.path}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </section>
                      </div>
                    </form>
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

export default UpdatePractice;
