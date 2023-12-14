import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LoginIcon from "@mui/icons-material/Login";
import { List, ListItem, Pagination, Stack, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { apiGetClass, apiUpdateClass } from "../api/class";
import { apiGetCourseByDepartment } from "../api/course";
import { apiGetDepartmentByID } from "../api/department";
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

  const [selectedClasses, setSelectedClasses] = useState([]);

  const handleInfoClick = (selectedClass) => {
    if (selectedClasses.includes(selectedClass)) {
      setSelectedClasses(
        selectedClasses.filter((classItem) => classItem !== selectedClass)
      );
    } else {
      setSelectedClasses([...selectedClasses, selectedClass]);
    }
  };

  return (
    <>
      <div className="bg-white py-8">
        <div className="flex px-5 gap-8">
          <div className="w-[80%]">
            <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
              {department?.department_name}
            </Typography>

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
            <List sx={{ my: 4 }}>
              {classes?.display && classes?.map((item) => (
                <Fragment key={item._id}>
                  <ListItem className="flex items-center hover:bg-[#ddd] transition-all ease-in-out duration-150 cursor-pointer">
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <LoginIcon sx={{ color: "#555", mr: 2 }} />
                        <Link
                          to={`/${path.CLASSPAGE}/${item._id}`}
                          className="w-[80%]"
                        >
                          <span className="mr-2">{item?.class_name}</span>
                          <span>{item?.class_code}</span>
                        </Link>
                      </div>
                      <div>
                        <InfoOutlinedIcon
                          sx={{ color: "#555", cursor: "pointer" }}
                          onClick={() => handleInfoClick(item)}
                        />
                      </div>
                    </div>
                  </ListItem>
                  <>
                    {selectedClasses.includes(item) && (
                      <div className="p-4">
                        <Typography variant="body2" color="textSecondary">
                          Teacher:
                          <span className="text-[#1c57a5] ml-1">
                            {item?.owner?.fullname}
                          </span>
                        </Typography>
                        <div className="mt-4">
                          <Link className="hover:bg-[#FF9500] border bg-primary p-2 text-white transition-all ease-in-out duration-200">
                            Click to enter this course
                          </Link>
                        </div>
                      </div>
                    )}
                  </>
                </Fragment>
              ))}
            </List>
          </div>
          <div className="w-[20%]">
            <RightNavigate></RightNavigate>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageCourse;
