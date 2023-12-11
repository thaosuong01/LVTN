import { Grid, List, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { apiGetCourseByCode } from "../api/course";
import { apiGetClass } from "../api/class";
import { path } from "../utils/path";

const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listClasses, setListClasses] = useState([]);
  const [course, setCourse] = useState({});
  //   console.log("course: ", course);
  //   console.log("listClasses: ", listClasses);

  const course_code = searchParams.get("search");
  const getListResult = async () => {
    try {
      //Lấy ra danh sách course
      const response = await apiGetCourseByCode(course_code);

      if (!response?.data) {
        setCourse({});
        setListClasses([]);
        return;
      }

      setCourse(response?.data);
      const course_id = response?.data?._id;
      const classes = course_id && (await apiGetClass(course_id));
      if (classes?.length === 0) return;

      setListClasses(classes.data);

      //Lấy id course để get ra danh sách lớp học
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    getListResult();
  }, [course_code]);

  return (
    <List sx={{ width: "100%", maxWidth: 420 }}>
      <Typography
        className="text-second"
        paddingBottom={5}
        sx={{ fontWeight: "bold", fontSize: "20px" }}
      >
        Kết quả tìm kiếm: {listClasses.length}
      </Typography>
      {listClasses?.length > 0 &&
        listClasses?.map((classes, index) => {
          return (
            <Grid pb={8} key={index}>
              <Grid item>
                <Typography
                  className="text-second"
                  sx={{ fontWeight: "bold", fontSize: "20px" }}
                >
                  {course?.course_code +
                    "_" +
                    classes?.class_code +
                    " " +
                    classes?.class_name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="textSecondary">
                  Teacher:
                  <span className="text-[#1c57a5] ml-1">
                    {classes?.owner?.fullname}
                  </span>
                </Typography>
              </Grid>
              <Grid item mt={2}>
                <Link
                  to={`/${path.CLASSPAGE}/${classes?._id}`}
                  className="hover:bg-[#FF9500] border bg-primary p-2 text-white"
                >
                  Click to enter this course
                </Link>
              </Grid>
            </Grid>
          );
        })}
    </List>
  );
};

export default SearchResult;
