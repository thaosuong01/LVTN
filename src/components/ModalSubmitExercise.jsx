import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, Modal, Typography } from "@mui/material";

import { Formik } from "formik";
import { default as React, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

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
  maxHeight: "90vh",
  overflowY: "auto",
};

const ModalSubmitExercise = ({ handleClose, open }) => {
  const [files, setFiles] = useState([]);

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
  const onSubmit = async () => {};
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
                  Tải lên kết quả
                </Typography>
              </div>
              <div>
                <Formik
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
                      <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                      >
                        <div>
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
                            {files?.length > 0 && (
                              <div>
                                <h3 className="title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3">
                                  Accepted Files
                                </h3>
                                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10 mb-5">
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
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ModalSubmitExercise;
