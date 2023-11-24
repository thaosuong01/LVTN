import { Divider, Grid, List, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiGetClassEnrolOfStudent } from "../api/enrol";
import { path } from "../utils/path";
import RightNavigate from "../components/RightNavigate";

const ListMyCourse = () => {
  const { user } = useSelector((state) => state.user);

  const [listClass, setListClass] = useState([]);
  console.log("listClass: ", listClass);

  const getClassEnrolOfStudent = async () => {
    const response = await apiGetClassEnrolOfStudent(user?._id);
    setListClass(response?.data);
  };

  useEffect(() => {
    getClassEnrolOfStudent();
  }, [user?._id]);

  return (
    <>
      <div className="py-8 bg-white">
        <div className="flex gap-8 px-5">
          <div className="w-[80%] px-6">
            <div>
              <h2 className="text-[#555] text-3xl font-semibold">My courses</h2>
              <Divider sx={{ my: 2, borderBottomWidth: 2 }}></Divider>
            </div>

            <div>
              <List sx={{ width: "100%", maxWidth: 420 }}>
                {listClass?.map((classes, index) => {
                  return (
                    <Grid pb={8} key={index}>
                      <Grid item>
                        <Typography
                          className="text-second"
                          sx={{ fontWeight: "bold", fontSize: "20px" }}
                        >
                          {classes?.class_id?.course_id?.course_code +
                            "_" +
                            classes?.class_id?.class_code +
                            " " +
                            classes?.class_id?.class_name}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" color="textSecondary">
                          Teacher:
                          <span className="text-[#1c57a5] ml-1">
                            {classes?.class_id?.owner?.fullname}
                          </span>
                        </Typography>
                      </Grid>
                      <Grid item mt={2}>
                        <Link
                          to={`/${path.CLASSPAGE}/${classes?.class_id?._id}`}
                          className="hover:bg-[#FF9500] border bg-primary p-2 text-white"
                        >
                          Click to enter this course
                        </Link>
                      </Grid>
                    </Grid>
                  );
                })}
              </List>
            </div>
          </div>
          <div className="w-[20%]">
            <RightNavigate></RightNavigate>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListMyCourse;
