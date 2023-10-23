import ClearIcon from "@mui/icons-material/Clear";
import { Input, InputLabel, TextField } from "@mui/material";
import { Formik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { uploadDocument } from "../api/upload";
import { path } from "../utils/path";

const UploadDocument = ({ className }) => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) => ({
          ...file,
          preview: URL.createObjectURL(file),
        })),
      ]);
    }

    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/png": [], "application/pdf": [] },
    maxSize: 1024 * 1000,
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
  const { tid } = useParams();

  const onSubmit = async (values) => {
    if (!files?.length) return;

    try {
      const formData = new FormData();

      files.forEach((file) => formData.append("file", file.path));
      formData.append("title", values.title);
      formData.append("class_id", cid);
      formData.append("topic_id", tid);

      const response = await uploadDocument(formData);
      if (response.status === 201) {
        Swal.fire({
          text: "Tải lên thành công!",
          confirmButtonColor: "#ffae00",
        });

        navigate(`/${path.CLASSPAGE}/${cid}`);
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
              <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                    {...getRootProps({
                      className: className,
                    })}
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
                          Drag & drop PDF files here, or click to select files
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Preview */}
                  <section className="mt-10">
                    <div className="flex gap-4">
                      <h2 className="title text-3xl font-semibold">Preview</h2>
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
                                <li key={error.code}>{error.message}</li>
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
    </>
  );
};

export default UploadDocument;
