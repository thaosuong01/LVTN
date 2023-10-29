import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  IconButton,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

import { Formik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate, useParams } from "react-router-dom";
import slugify from "slugify";
import Swal from "sweetalert2";
import * as Yup from "yup";
import {
  apiGetDocumentById,
  apiUpdateDocumentById
} from "../api/upload";

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

const ModalEditDocument = ({ open, handleClose, documentId }) => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  console.log("files: ", files);
  const [rejected, setRejected] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    console.log("acceptedFiles: ", acceptedFiles);
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [...previousFiles, ...acceptedFiles]);
    }

    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/png": [], "application/pdf": [] },
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
    setRejected([]);
  };

  const removeRejected = (path) => {
    setRejected((files) => files.filter(({ file }) => file.path !== path));
  };

  const { cid } = useParams();
  //handleRemoveCurrentFile

  const handleRemoveCurrentFile = (file, values) => {
    setInitialValues({
      ...values,
      files: initialValues.files?.filter((item) => item !== file),
    });
  };

  // Handle edit document
  const onSubmit = async (values) => {
    // if (!files?.length) return;
    console.log("files: ", files);
    console.log("values: ", values);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", renameFile(file, fSlug(file.name)));
      });

      formData.append("title", values.title);
      formData.append("newFiles", values.files);

      const response = await apiUpdateDocumentById(documentId, formData);
      console.log("response: ", response.status);
      if (response.status === 200) {
        handleClose();
        Swal.fire({
          text: "Cập nhật thành công!",
          confirmButtonColor: "#ffae00",
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

  const [initialValues, setInitialValues] = useState({ title: "" });

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Vui lòng nhập tiêu đề"),
  });

  const getDocumentById = async (documentId) => {
    try {
      const response = await apiGetDocumentById(documentId);
      setInitialValues(response?.data?.document);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    getDocumentById(documentId);
  }, [documentId]);

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
              <div className="flex items-center justify-center mb-8">
                <Typography
                  variant="h5"
                  component="h4"
                  align="center"
                  className="w-[70%]"
                  sx={{ fontWeight: "bold" }}
                >
                  Chỉnh sửa tài liệu
                </Typography>
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
                    getFieldProps,
                    errors,
                  }) => {
                    return (
                      <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        noValidate
                      >
                        <div className="">
                          <div className="flex justify-center items-center my-2">
                            <InputLabel className="w-[30%]">Tiêu đề</InputLabel>
                            <div className="w-[70%]">
                              <TextField
                                name="title"
                                variant="outlined"
                                onChange={handleChange}
                                fullWidth
                                {...getFieldProps("title")}
                                error={touched.title && Boolean(errors.title)}
                                helperText={touched.title && errors.title}
                                value={values?.title}
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <InputLabel>Files</InputLabel>
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
                                className="ml-auto mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-[#90c446] rounded-md px-3 hover:bg-button hover:text-white transition-colors"
                              >
                                Upload Files
                              </button>
                            </div>

                            {/* Current files */}
                            <h3 className="title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3">
                              Current Files
                            </h3>
                            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10">
                              {values?.files?.map((file) => (
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
                            <h3 className="title text-lg font-semibold text-neutral-600 mt-24 border-b pb-3">
                              Accepted Files
                            </h3>
                            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10">
                              {files.map((file) => (
                                <li
                                  key={file.path}
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
                                    onClick={() => removeFile(file.path)}
                                  >
                                    <ClearIcon className="w-5 h-5 fill-white hover:fill-secondary-400 transition-colors" />
                                  </button>
                                  <span>{file.path}</span>
                                </li>
                              ))}
                            </ul>

                            {/* Rejected Files */}
                            <h3 className="title text-lg font-semibold text-neutral-600 mt-24 border-b pb-3">
                              Rejected Files
                            </h3>
                            <ul className="mt-6 flex flex-col">
                              {rejected.map(({ file, errors }) => (
                                <li
                                  key={file.name}
                                  className="flex items-start justify-between"
                                >
                                  <div>
                                    <p className="mt-2 text-neutral-500 text-sm font-medium">
                                      {file.name}
                                    </p>
                                    <ul className="text-[12px] text-red-400">
                                      {errors.map((error) => (
                                        <li key={error.code}>
                                          {error.message}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <button
                                    type="button"
                                    className="mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-neutral-700 transition-colors"
                                    onClick={() => removeRejected(file.path)}
                                  >
                                    Remove
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </section>
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

export default ModalEditDocument;
