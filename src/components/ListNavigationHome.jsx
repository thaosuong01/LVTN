import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Typography } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavigationItem = ({ label, path, children = [] }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton
        className=""
        component={children?.length ? "div" : Link}
        {...(children?.length ? {} : { to: path })}
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
            {children.map((item, idx) => (
              <ListItemButton
                key={idx}
                component={Link}
                to={item.path}
              >
                <Typography variant="body1" sx={{ fontSize: "14px" }}>
                  {item.department}
                </Typography>
              </ListItemButton>
            ))}
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
