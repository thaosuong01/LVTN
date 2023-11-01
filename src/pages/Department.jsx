import { List, ListItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiGetClass } from "../api/class";
import RightNavigate from "../components/RightNavigate";
import { path } from "../utils/path";

const Department = () => {
  const { departments } = useSelector((state) => state.department);

  const [courseClasses, setCourseClasses] = useState({});

  useEffect(() => {
    async function getClassesByCourse(courseId) {
      const response = await apiGetClass(courseId);
      setCourseClasses((prevCourseClasses) => ({
        ...prevCourseClasses,
        [courseId]: response?.data.length,
      }));
    }

    departments?.forEach((department) => {
      department.courses.forEach((course) => {
        getClassesByCourse(course.id);
      });
    });
  }, [departments]);

  return (
    <>
      <div className="bg-white py-8">
        <div className="flex px-5 gap-8">
          <div className="w-[80%]">
            <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
              Danh mục khoa
            </Typography>
            <List>
              {departments?.map((department, index) => (
                <ListItem
                  key={index}
                  className="flex items-center"
                  sx={{
                    "&:hover": {
                      color: "#ffae00",
                      backgroundColor: "#ddd",
                      transition: "ease-in-out",
                      transitionDuration: "0.3s",
                    },
                  }}
                >
                  <div className="flex items-center w-full">
                    <Link
                      to={`/${path.MANAGECOURSE}/${department.department_id}`}
                      className="w-[80%]"
                    >
                      {department.department}
                    </Link>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#555",
                        mt: "1px",
                        width: "20%",
                      }}
                      className="flex justify-end"
                    >
                      {department.courses.reduce(
                        (total, course) =>
                          total + (courseClasses[course.id] || 0),
                        0
                      )}
                    </Typography>
                  </div>
                </ListItem>
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

export default Department;
