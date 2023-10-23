import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import HubIcon from "@mui/icons-material/Hub";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import {
  Box,
  CardContent,
  Collapse,
  List,
  ListItemButton,
  Pagination,
  Stack,
  Typography,
  makeStyles,
} from "@mui/material";
import Card from "@mui/material/Card";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { TransitionGroup } from "react-transition-group";
import ListNavigationHome from "../components/ListNavigationHome";
import ManagementArea from "../components/ManagementArea";

const data = [
  {
    department_name: "Khoa công nghệ thông tin",
    path: "/cntt",
    children: [
      { course_name: "Item 4.2", path: "/item4-2" },
      { course_name: "Item 4.2", path: "/item4-2" },
      { course_name: "Item 4.2", path: "/item4-2" },
      { course_name: "Item 4.2", path: "/item4-2" },
    ],
  },
  {
    department_name: "Khoa công nghệ thông tin",
    path: "/cntt",
  },
  {
    department_name: "Khoa công nghệ thông tin",
    path: "/cntt",
  },
  {
    department_name: "Khoa Kỹ thuật máy tính",
    path: "/ktmt",
    children: [
      { course_name: "Item 4.2", path: "/item4-2" },
      { course_name: "Item 4.2", path: "/item4-2" },
      { course_name: "Item 4.2", path: "/item4-2" },
      { course_name: "Item 4.2", path: "/item4-2" },
    ],
  },
  {
    department_name: "Khoa công nghệ thông tin",
    path: "/cntt",
  },
  {
    department_name: "Khoa Kỹ thuật máy tính",
    path: "/ktmt",
    children: [
      { course_name: "Item 4.2", path: "/item4-2" },
      { course_name: "Item 4.2", path: "/item4-2" },
      { course_name: "Item 4.2", path: "/item4-2" },
      { course_name: "Item 4.2", path: "/item4-2" },
    ],
  },
  {
    department_name: "Khoa công nghệ thông tin",
    path: "/cntt",
  },
  {
    department_name: "Khoa Kỹ thuật máy tính",
    path: "/ktmt",
    children: [
      { course_name: "Item 4.2", path: "/item4-2" },
      { course_name: "Item 4.2", path: "/item4-2" },
      { course_name: "Item 4.2", path: "/item4-2" },
      { course_name: "Item 4.2", path: "/item4-2" },
    ],
  },
  {
    department_name: "Khoa Kỹ thuật máy tính",
    path: "/ktmt",
    children: [
      { course_name: "Item 4.2", path: "/item4-2" },
      { course_name: "Item 4.2", path: "/item4-2" },
      { course_name: "Item 4.2", path: "/item4-2" },
      { course_name: "Item 4.2", path: "/item4-2" },
    ],
  },
];

const ListCourse = () => {
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
      <div className="bg-white py-8">
        <div className="flex gap-8 px-5">
          <div className="w-[80%]">
            <List>
              {data.map((item, index) => (
                <Fragment key={index}>
                  <ListItemButton
                    component={item.children ? "div" : Link}
                    onClick={
                      item.children ? () => handleClick(index) : undefined
                    }
                    sx={{ padding: 0, paddingY: 1 }}
                  >
                    {item.children ? (
                      openIndexes.includes(index) ? (
                        <ArrowDropDownIcon style={{ color: "#555" }} />
                      ) : (
                        <ArrowRightIcon style={{ color: "#555" }} />
                      )
                    ) : (
                      <KeyboardArrowRightOutlinedIcon
                        style={{ color: "#555" }}
                      />
                    )}
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "20px", fontWeight: "bold" }}
                      className="text-second"
                    >
                      {item.department_name}
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
                              to={child.path}
                              sx={{ pl: 4 }}
                            >
                              <Typography
                                variant="body1"
                                sx={{ fontSize: "18px" }}
                                className="text-[#1c57a5] hover:text-[#222] transition-all ease-in-out"
                              >
                                {child.course_name}
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

            <TransitionGroup>
              <div className="flex justify-center">
                <Stack spacing={2}>
                  <Pagination
                    count={10}
                    shape="rounded"
                    sx={{
                      "& .css-10w330c-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected":
                        {
                          backgroundColor: "#ffae00",
                          color: "#fff",
                        },

                      "& .css-10w330c-MuiButtonBase-root-MuiPaginationItem-root:hover":
                        {
                          backgroundColor: "#FF9500",
                          color: "#fff",
                        },
                    }}
                  />
                </Stack>
              </div>
            </TransitionGroup>
          </div>
          <div className="w-[20%]">
            <Card
              sx={{
                maxWidth: 345,
              }}
              className="bg-[#fefefe]"
            >
              <CardContent>
                <div className="flex gap-4 items-center mb-2">
                  <HubIcon className="text-primary"></HubIcon>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      marginTop: "2px",
                      color: "#555",
                      fontSize: "18px",
                    }}
                  >
                    Navigation
                  </Typography>
                </div>
                <Box
                  sx={{
                    borderBottom: 1,
                    color: "#dedede",
                    marginBottom: "12px",
                  }}
                ></Box>
                <Box>
                  <Link className="text-second font-bold">Home</Link>
                  <Stack flexDirection={"row"} py={1} className="mb-[-10px]">
                    <img
                      className="w-4 mr-2"
                      src="/../src/assets/icons/dashboard.svg"
                      alt=""
                    />
                    <Link className="text-sm">Dashboard</Link>
                  </Stack>

                  <ListNavigationHome
                    data={[
                      {
                        label: "Item 3",
                        path: "/item3",
                        children: [
                          { label: "Item 3.1", path: "/item3-1" },
                          { label: "Item 3.2", path: "/item3-2" },
                        ],
                      },
                      {
                        label: "Item 4",
                        path: "/item4",
                        children: [
                          { label: "Item 4.2", path: "/item4-2" },
                          { label: "Item 4.1", path: "/item4-1" },
                          { label: "Item 4.3", path: "/item4-2" },
                          { label: "Item 4.4", path: "/item4-1" },
                          { label: "Item 4.5", path: "/item4-2" },
                          { label: "Item 4.6", path: "/item4-1" },
                        ],
                      },
                    ]}
                  />
                </Box>
              </CardContent>
            </Card>

            <Box
              sx={{
                height: 32,
              }}
            ></Box>

            <Card
              sx={{
                maxWidth: 345,
              }}
              className="bg-[#fefefe]"
            >
              <CardContent>
                <div className="flex gap-4 items-center mb-2">
                  <SettingsSuggestIcon
                    sx={{
                      fontSize: "28px",
                    }}
                    className="text-primary"
                  ></SettingsSuggestIcon>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      marginTop: "2px",
                      color: "#555",
                      fontSize: "18px",
                    }}
                  >
                    Management Area
                  </Typography>
                </div>
                <Box
                  sx={{
                    borderBottom: 1,
                    color: "#dedede",
                    marginBottom: "12px",
                  }}
                ></Box>
                <ManagementArea></ManagementArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListCourse;
