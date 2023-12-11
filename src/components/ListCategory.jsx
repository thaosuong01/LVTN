import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { Collapse, List, ListItemButton, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TransitionGroup } from "react-transition-group";

const ListCategory = () => {
  const [openIndexes, setOpenIndexes] = useState([]);
  const { departments } = useSelector((state) => state.department);

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
        {departments?.map((item, index) => (
          <Fragment key={index}>
            <ListItemButton
              component={item?.courses.length === 0 ? "div" : Link}
              onClick={
                item?.courses.length === 0
                  ? undefined
                  : () => handleClick(index)
              }
              sx={{ padding: 0 }}
            >
              {item?.courses.length === 0 ? (
                <KeyboardArrowRightOutlinedIcon style={{ color: "#555" }} />
              ) : openIndexes.includes(index) ? (
                <ArrowDropDownIcon style={{ color: "#555" }} />
              ) : (
                <ArrowRightIcon style={{ color: "#555" }} />
              )}
              <Typography
                variant="body1"
                sx={{ fontSize: "20px", fontWeight: "bold" }}
                className="text-second"
              >
                {item?.department}
              </Typography>
            </ListItemButton>

            <TransitionGroup>
              {item?.courses && openIndexes.includes(index) && (
                <Collapse in={true} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item?.courses.map((child, childIndex) => (
                      <ListItemButton
                        key={childIndex}
                        component={Link}
                        to={`/course/${child?.id}`}
                        sx={{ pl: 4 }}
                      >
                        <Typography
                          variant="body1"
                          sx={{ fontSize: "18px" }}
                          className="text-[#1c57a5] hover:text-[#222] transition-all ease-in-out"
                        >
                          {`${child?.name} - ${child?.code}`}
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

export default ListCategory;
