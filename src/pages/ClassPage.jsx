import { Breadcrumbs, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { TransitionGroup } from "react-transition-group";
import { apiGetClassById } from "../api/class";
import ListDocument from "../components/ListDocument";
import RightNavigate from "../components/RightNavigate";
import { toggleEditMode } from "../redux/courseSlice";
import { apiGetCourseByID } from "../api/course";
import { path } from "../utils/path";

const ClassPage = () => {
  const dispatch = useDispatch();

  const { isEditMode } = useSelector((state) => state.course);

  const handleToggleEditingMode = () => {
    dispatch(toggleEditMode());
  };

  const { user } = useSelector((state) => state.user);

  const { cid } = useParams();

  const [classes, setClasses] = useState();
  console.log('classes: ', classes);
  useEffect(() => {
    async function getClass() {
      const response = await apiGetClassById(cid);
      setClasses(response?.data);
    }

    getClass();
  }, [cid]);

  // const [course, setCourse] = useState();
  // useEffect(() => {
  //   async function fetchCourse() {
  //     const courseId = await classes?.course_id?._id;
  //     const response = await apiGetCourseByID(courseId);
  //     setCourse(response?.data);
  //   }

  //   fetchCourse();
  // }, [cid]);

  // const did = course?.department_id?._id;

  return (
    <>
      <div className="bg-white py-8">
        <div className="flex gap-8 px-5">
          <div className="w-[80%]">
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                className="text-second hover:text-black"
                to={`/${path.LISTCOURSE}/${classes?.course_id?.department_id?._id}`}
              >
                {classes?.course_id?.department_id?.department_name}
              </Link>
              <Link
                className="text-second hover:text-black"
                to={`/${path.LISTDEPARTMENT}`}
              >
                {classes?.course_id?.course_name}
              </Link>
              <Typography color="text.primary">
                {classes?.class_name + " " + classes?.class_code}
              </Typography>
            </Breadcrumbs>
            <TransitionGroup>
              <ListDocument></ListDocument>
            </TransitionGroup>
          </div>
          <div className="w-[20%]">
            <div>
              {user?._id === classes?.owner && (
                <Button
                  sx={{
                    backgroundColor: "#90c446",
                    color: "white",
                    "&:hover": { backgroundColor: "#5b9608" },
                    borderRadius: 0,
                    mb: 2,
                  }}
                  onClick={handleToggleEditingMode}
                >
                  {isEditMode ? "Tắt chế độ chỉnh sửa" : "Bật chế độ chỉnh sửa"}
                </Button>
              )}
            </div>
            <RightNavigate></RightNavigate>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassPage;
