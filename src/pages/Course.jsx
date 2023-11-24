import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LoginIcon from "@mui/icons-material/Login";
import { Breadcrumbs, List, ListItem, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiGetClass } from "../api/class";
import { apiGetCourseByID } from "../api/course";
import { apiGetUserEnroledByClass } from "../api/enrol";
import RightNavigate from "../components/RightNavigate";
import { path } from "../utils/path";

const Course = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [course, setCourse] = useState({});
  const [classes, setClasses] = useState([]);

  const { cid } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await apiGetCourseByID(cid);
        setCourse(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourse();
  }, [cid]);

  useEffect(() => {
    async function getClass() {
      const response = await apiGetClass(cid);
      setClasses(response?.data);
    }

    getClass();
  }, [cid]);

  const handleClick = async (class_id) => {
    const response = await apiGetUserEnroledByClass(class_id);
    const studentEnroled = response?.data;

    const enrolledUsers = studentEnroled.map(
      (enrollment) => enrollment.user_id._id
    );

    if (user?.role_id?.role_name === "Teacher") {
      return navigate(`/${path.CLASSPAGE}/${class_id}`);
    }

    if (enrolledUsers.includes(user?._id)) {
      navigate(`/${path.CLASSPAGE}/${class_id}`);
    } else {
      navigate(`/${path.ENROLMENTPAGE}/${class_id}`);
    }
  };

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
            <Breadcrumbs aria-label="breadcrumb">
              <Link className="text-second hover:text-black" href="/">
                {course?.department_id?.department_name}
              </Link>
              <Typography color="text.primary">
                {course?.course_name}
              </Typography>
            </Breadcrumbs>

            <List sx={{ my: 4 }}>
              {classes?.map((item) => (
                <Fragment key={item._id}>
                  <ListItem className="flex items-center hover:bg-[#ddd] transition-all ease-in-out duration-150 cursor-pointer">
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <LoginIcon sx={{ color: "#555", mr: 2 }} />
                        <span
                          onClick={() => handleClick(item?._id)}
                          className="w-[80%]"
                        >
                          <span className="mr-2">{item?.class_name}</span>
                          <span>{item?.class_code}</span>
                        </span>
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

export default Course;
