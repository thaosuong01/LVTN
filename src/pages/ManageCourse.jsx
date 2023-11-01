import ClearIcon from "@mui/icons-material/Clear";
import SettingsIcon from "@mui/icons-material/Settings";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { List, ListItem, Pagination, Stack, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { apiGetClass, apiUpdateClass, deleteClass } from "../api/class";
import { apiGetCourseByDepartment } from "../api/course";
import { apiGetDepartmentByID } from "../api/department";
import ModalEditCourse from "../components/ModalEditCourse";
import RightNavigate from "../components/RightNavigate";
import { path } from "../utils/path";

const ManageCourse = () => {
  const { user } = useSelector((state) => state.user);

  const [activeIconIndex, setActiveIconIndex] = useState([]);

  const handleClick = async (index) => {
    let _activeIconIndex = [...activeIconIndex];

    try {
      if (_activeIconIndex.includes(index)) {
        _activeIconIndex = _activeIconIndex.filter((i) => i !== index);
      } else {
        _activeIconIndex = [..._activeIconIndex, index];
      }

      const updatedClass = {
        display: _activeIconIndex.includes(index),
      };

      setActiveIconIndex(_activeIconIndex);
      const response = await apiUpdateClass(updatedClass, index);
      console.log("response: ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [department, setDepartment] = useState([]);
  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);

  const { did } = useParams();

  const getDepartmentById = async () => {
    try {
      const response = await apiGetDepartmentByID(did);
      setDepartment(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDepartmentById();
  }, [did]);

  const fetchCourse = async () => {
    try {
      const response = await apiGetCourseByDepartment(did);
      setCourses(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [did]);

  const fetchClasses = async () => {
    try {
      const courseIds = courses.map((course) => course._id);
      const allClasses = [];

      for (const cid of courseIds) {
        const response = await apiGetClass(cid);
        const classData = response?.data;
        allClasses.push(...classData);
      }

      setClasses(allClasses);

      return allClasses;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const dataClasses = await fetchClasses();
      setActiveIconIndex(
        dataClasses?.filter((d) => d.display).map((v) => v._id)
      );
    })();
  }, [courses]);

  const [open, setOpen] = useState(false);
  const [openClassId, setOpenClassId] = useState(null);

  const handleOpen = (classId) => {
    setOpen(true);
    setOpenClassId(classId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ffae00",
      cancelButtonColor: "#90c446",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteClass(id);
          Swal.fire("Deleted!", "The class has been deleted.", "success");
          fetchClasses();
        } catch (error) {
          Swal.fire("Fail!", "Delete fail", "error");
        }
      }
    });
  };

  return (
    <>
      <div className="bg-white py-8">
        <div className="flex px-5 gap-8">
          <div className="w-[80%]">
            <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
              {department?.department_name}
            </Typography>

            <div className="text-center">
              <Link
                to={`/${path.ADDCOURSE}`}
                className="bg-button hover:bg-[#5b9608] text-white p-2 transition-all ease-in-out duration-150"
              >
                Tạo khóa học mới
              </Link>
            </div>
            <div className="flex justify-center my-8">
              <Stack spacing={2}>
                <Pagination
                  count={10}
                  shape="rounded"
                  sx={{
                    "& .css-10w330c-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected":
                      {
                        backgroundColor: "#ffae00",
                        color: "#fff",
                        transition: "ease-in-out ",
                        transitionDuration: ".3s",
                      },
                    "& .css-10w330c-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected:hover":
                      {
                        backgroundColor: "#FF9500",
                        color: "#fff",
                        transition: "ease-in-out ",
                        transitionDuration: ".3s",
                      },

                    "& .css-10w330c-MuiButtonBase-root-MuiPaginationItem-root:hover":
                      {
                        backgroundColor: "#FF9500",
                        color: "#fff",
                        transition: "ease-in-out ",
                        transitionDuration: ".3s",
                      },
                  }}
                />
              </Stack>
            </div>
            {classes.map((item) => (
              <List key={item?._id}>
                <ListItem className="flex items-center">
                  <div className="flex items-center w-full">
                    <Link
                      to={`/${path.CLASSPAGE}/${item?._id}`}
                      className="w-[80%]"
                    >
                      <span className="mr-4">{item.class_name}</span>
                      <span>{item.class_code}</span>
                    </Link>
                    <span className="flex gap-4 justify-center text-second">
                      {item?.owner?._id === user?._id && (
                        <Fragment>
                          <SettingsIcon
                            sx={{
                              fontSize: "20px",
                              cursor: "pointer",
                              "&:hover": { color: "#ffae00" },
                              transition: "ease-in-out",
                              transitionDuration: ".3s",
                            }}
                            onClick={() => handleOpen(item?._id)}
                          />
                          <ClearIcon
                            sx={{
                              fontSize: "20px",
                              cursor: "pointer",
                              "&:hover": { color: "#ffae00" },
                              transition: "ease-in-out",
                              transitionDuration: ".3s",
                            }}
                            onClick={() => handleDelete(item?._id)}
                          />

                          {!activeIconIndex.includes(item?._id) ? (
                            <VisibilityOffIcon
                              sx={{
                                fontSize: "20px",
                                cursor: "pointer",
                                "&:hover": { color: "#ffae00" },
                                transition: "ease-in-out",
                                transitionDuration: ".3s",
                              }}
                              onClick={() => handleClick(item?._id)}
                            />
                          ) : (
                            <VisibilityIcon
                              sx={{
                                fontSize: "20px",
                                cursor: "pointer",
                                "&:hover": { color: "#ffae00" },
                                transition: "ease-in-out",
                                transitionDuration: ".3s",
                              }}
                              onClick={() => handleClick(item?._id)}
                            />
                          )}
                        </Fragment>
                      )}
                    </span>
                  </div>
                </ListItem>
              </List>
            ))}
          </div>
          <div className="w-[20%]">
            <RightNavigate></RightNavigate>
          </div>
          {open && (
            <ModalEditCourse
              handleClose={handleClose}
              classId={openClassId}
              open={open}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ManageCourse;
