import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ComputerIcon from "@mui/icons-material/Computer";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { Collapse, List, ListItemButton, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { TransitionGroup } from "react-transition-group";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { path } from "../utils/path";

const data = [
  {
    label: "Quản trị khóa học",
    path: "/ktmt",
    children: [
      {
        childLabel: "Chỉnh sửa các khóa học",
        path: path,
        icon: SettingsIcon,
      },
      {
        childLabel: "Hoàn thành khóa học",
        path: "/cntt",
        icon: SettingsIcon,
      },
    ],
  },

  {
    label: "Thành viên",
    path: "/ktmt",
    children: [
      {
        childLabel: "Người dùng đã ghi danh",
        path: "/item4-1",
        icon: PersonIcon,
      },
      {
        childLabel: "Phương thức ghi danh",
        path: "/item4-2",
        icon: LockOpenIcon,
      },
    ],
  },
];

const ManagementArea = () => {
  const [openIndexes, setOpenIndexes] = useState([]);

  const handleClick = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <>
      <List>
        {data.map((item, index) => (
          <Fragment key={index}>
            <ListItemButton
              component={item.children ? "div" : Link}
              onClick={item.children ? () => handleClick(index) : undefined}
              sx={{ padding: 0 }}
            >
              {item.icon && (
                <item.icon
                  style={{
                    color: "#555",
                    fontSize: "20px",
                    marginRight: "12px",
                  }}
                />
              )}
              {item.children ? (
                openIndexes.includes(index) ? (
                  <ArrowDropDownIcon
                    style={{ color: "#555", fontSize: "32px" }}
                  />
                ) : (
                  <ArrowRightIcon style={{ color: "#555", fontSize: "32px" }} />
                )
              ) : null}
              <Typography
                variant="body1"
                sx={{ fontSize: "14px" }}
                className="text-second"
              >
                {item.label}
              </Typography>
            </ListItemButton>

            <TransitionGroup>
              {item.children && openIndexes.includes(index) && (
                <Collapse in={true} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child, childIndex) => (
                      <ListItemButton
                        key={childIndex}
                        component={Link}
                        to={`/${path.LISTDEPARTMENT}`}
                        sx={{ pl: 2 }}
                      >
                        {child.icon && (
                          <child.icon
                            style={{
                              color: "#555",
                              fontSize: "20px",
                              marginRight: "12px",
                            }}
                          />
                        )}

                        <Typography
                          variant="body1"
                          sx={{ fontSize: "14px" }}
                          className="text-second"
                        >
                          {child.childLabel}
                        </Typography>
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </TransitionGroup>
          </Fragment>
        ))}
      </List>
    </>
  );
};

export default ManagementArea;
