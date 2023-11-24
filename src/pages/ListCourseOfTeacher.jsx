import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LoginIcon from "@mui/icons-material/Login";
import { List, ListItem, Pagination, Stack, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  apiGetClassCreatedByOwner
} from "../api/class";
import RightNavigate from "../components/RightNavigate";
import { path } from "../utils/path";
const ListCourseOfTeacher = () => {
  const { user } = useSelector((state) => state.user);

  const [classes, setClasses] = useState([]);
  console.log("classes: ", classes);

  async function getClassByUser() {
    const response = await apiGetClassCreatedByOwner();
    setClasses(response?.data);
  }

  useEffect(() => {
    getClassByUser();
  }, []);

  return (
    <>
      <div className="bg-white py-8">
        <div className="flex px-5 gap-8">
          <div className="w-[80%]">
            <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
              Danh sách lớp học
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
              {classes?.map((item) => (
                <Fragment key={item._id}>
                  <ListItem className="flex items-center hover:bg-[#ddd] transition-all ease-in-out duration-150 cursor-pointer">
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <LoginIcon sx={{ color: "#555", mr: 2 }} />
                        <Link
                          to={`/${path.USERENROLED}/${item._id}`}
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

export default ListCourseOfTeacher;
