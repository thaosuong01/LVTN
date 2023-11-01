import {
  Divider,
  Grid,
  List,
  Typography
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ListMyCourse = () => {
  

  return (
    <>
      <div className="py-12 bg-white">
        <div>
          <h2 className="text-[#555] text-3xl font-semibold">My courses</h2>
          <Divider sx={{ my: 2, borderBottomWidth: 2 }}></Divider>
        </div>

        <div>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <Grid container direction="column" pb={8}>
              <Grid item>
                <Typography
                  className="text-second"
                  sx={{ fontWeight: "bold", fontSize: "20px" }}
                >
                  Cấu trúc dữ liệu
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="textSecondary">
                  Teacher:
                  <span className="text-[#1c57a5] ml-1">Bảo</span>
                </Typography>
              </Grid>
              <Grid item mt={2}>
                  <Link className="hover:bg-[#FF9500] border bg-primary p-2 text-white">
                    Click to enter this course
                  </Link>
              </Grid>
            </Grid>
            <Grid container direction="column" pb={8}>
              <Grid item>
                <Typography
                  className="text-second"
                  sx={{ fontWeight: "bold", fontSize: "20px" }}
                >
                  Cấu trúc dữ liệu
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="textSecondary">
                  Teacher:
                  <span className="text-[#1c57a5] ml-1">Bảo</span>
                </Typography>
              </Grid>
              <Grid item mt={2}>
                  <Link className="hover:bg-[#FF9500] border bg-primary p-2 text-white transition-all ease-in-out duration-200">
                    Click to enter this course
                  </Link>
              </Grid>
            </Grid>
          </List>
        </div>

        <div>
          <Link className="text-primary hover:text-[#FF9500]">
            View all courses
          </Link>
        </div>
      </div>
    </>
  );
};

export default ListMyCourse;
