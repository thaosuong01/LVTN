import HubIcon from "@mui/icons-material/Hub";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { Box, CardContent, Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ListNavigationHome from "./ListNavigationHome";
import ManagementArea from "./ManagementArea";
import { apiGetClassEnrolOfStudent } from "../api/enrol";
import { apiGetClassCreatedByOwner } from "../api/class";

const RightNavigate = () => {
  const { user } = useSelector((state) => state.user);
  const { departments } = useSelector((state) => state.department);
  console.log("departments: ", departments);

  const activeDepartments = departments?.filter((depart) => !depart.delete);

  const [listClass, setListClass] = useState([]);

  const getClassEnrolOfStudent = async () => {
    const response = await apiGetClassEnrolOfStudent(user?._id);
    const activeClasses = response?.data?.filter((enrolledClass) => {
      return !enrolledClass.class_id.delete; // Assuming 'delete' property indicates soft deletion
    });

    setListClass(activeClasses);
  };

  useEffect(() => {
    getClassEnrolOfStudent();
  }, [user?._id]);

  const getClassByOwner = async () => {
    const response = await apiGetClassCreatedByOwner();

    const activeClasses = response?.data?.filter((item) => !item.delete);

    // setClasses(activeClasses);
    setListClass(activeClasses);
  };

  useEffect(() => {
    if (user?.role_id?.role_name === "Teacher") {
      getClassByOwner();
    }
  }, [user?._id]);

  return (
    <>
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
                  label: "All Courses",
                  pathData: "/",
                  children: activeDepartments,
                },
                {
                  label: "My Classes",
                  pathData: "/",
                  children: listClass,
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

      {user && user?.role_id?.role_name === "Teacher" && (
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
      )}
    </>
  );
};

export default RightNavigate;
