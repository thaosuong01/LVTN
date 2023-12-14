import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Typography } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { path } from "../utils/path.js";
import { useSelector } from "react-redux";
import { number } from "yup";

const NavigationItem = ({ label, pathData, children = [] }) => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton
        className=""
        component={children?.length ? "div" : Link}
        {...(children?.length ? {} : { to: pathData })}
        onClick={children?.length ? handleClick : undefined}
        sx={{ padding: 0 }}
      >
        {children?.length ? (
          open ? (
            <ArrowDropDownIcon style={{ color: "#555" }} />
          ) : (
            <ArrowRightIcon style={{ color: "#555" }} />
          )
        ) : null}

        <Typography variant="body1" sx={{ fontSize: "14px" }}>
          {label}
        </Typography>
      </ListItemButton>

      {children?.length ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item, idx) => {
              if (item?.department) {
                return (
                  <ListItemButton
                    key={idx}
                    component={Link}
                    to={`/${path.LISTCOURSE}/${item?.department_id}`}
                  >
                    <Typography variant="body1" sx={{ fontSize: "14px" }}>
                      {item.department}
                    </Typography>
                  </ListItemButton>
                );
              } else {
                return (
                  <>
                    {user?.role_id?.role_name === "Student" ? (
                      <ListItemButton
                        key={idx}
                        component={Link}
                        to={`/${path.CLASSPAGE}/${item?.class_id?._id}`}
                      >
                        <Typography variant="body1" sx={{ fontSize: "14px" }}>
                          {item?.class_id?.course_id?.course_code +
                            "" +
                            item?.class_id?.class_code +
                            "_" +
                            item?.class_id?.class_name +
                            ` (GV: ${item?.class_id?.owner?.fullname})`}
                        </Typography>
                      </ListItemButton>
                    ) : (
                      <ListItemButton
                        key={idx}
                        component={Link}
                        to={`/${path.CLASSPAGE}/${item?._id}`}
                      >
                        <Typography variant="body1" sx={{ fontSize: "14px" }}>
                          {item?.course_id?.course_code +
                            "_" +
                            item?.class_name +
                            ` (${item?.class_code})`}
                        </Typography>
                      </ListItemButton>
                    )}
                  </>
                );
              }
            })}
          </List>
        </Collapse>
      ) : null}
    </>
  );
};

const ListNavigationHome = ({ data = [] }) => {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "#fefefe",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {data.length
        ? data.map((row, index) => <NavigationItem {...row} key={index} />)
        : null}
    </List>
  );
};

export default ListNavigationHome;
