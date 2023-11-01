import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, InputLabel, Modal, TextField } from "@mui/material";
import { Formik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import slugify from "slugify";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { uploadDocument } from "../api/upload";

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

const UploadDocument = ({ handleClose, topicId, classId, open, onClose }) => {
  const [files, setFiles] = useState([]);
  console.log("files: ", files);
  const [rejected, setRejected] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    console.log("acceptedFiles: ", acceptedFiles);
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        // ...acceptedFiles.map((file) => ({
        //   ...file,
        //   preview: URL.createObjectURL(file),
        // })),
        ...acceptedFiles,
      ]);
    }

    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }
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
    setRejected([]);
  };

  const removeRejected = (path) => {
    setRejected((files) => files.filter(({ file }) => file.path !== path));
  };

  const onSubmit = async (values) => {
    if (!files?.length) return;
    console.log("files: ", files);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", renameFile(file, fSlug(file.name)));
      });

      formData.append("title", values.title);
      formData.append("class_id", classId);
      formData.append("topic_id", topicId);

      const response = await uploadDocument(formData);
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

  const initialValues = { title: "" };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Vui lòng nhập tiêu đề"),
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
                <h1 className="text-2xl font-bold">Thêm tài liệu học tập</h1>
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
                  {({ touched, handleSubmit, getFieldProps, errors }) => {
                    return (
                      <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                      >
                        <div className="">
                          <div className="flex justify-center items-center my-2">
                            <InputLabel className="w-[30%]">Tiêu đề</InputLabel>
                            <div className="w-[70%]">
                              <TextField
                                name="title"
                                variant="outlined"
                                fullWidth
                                {...getFieldProps("title")}
                                error={touched.title && Boolean(errors.title)}
                                helperText={touched.title && errors.title}
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

                            {/* Accepted files */}
                            <h3 className="title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3">
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

export default UploadDocument;
