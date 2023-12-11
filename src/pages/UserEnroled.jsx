import { Clear } from "@mui/icons-material";
import { Box, Breadcrumbs, Button, Container, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { apiGetClassById } from "../api/class";
import {
  apiDeleteStudentEnroled,
  apiGetUserEnroledByClass,
} from "../api/enrol";
import RightNavigate from "../components/RightNavigate";
import { apiGetCourseByID } from "../api/course";
import { path } from "../utils/path";
import ModalAddUser from "../components/ModalAddUser";

const UserEnroled = () => {
  const actionButton = (params) => (
    <Button onClick={() => handleDelete(params.row._id)}>
      <Clear className="text-primary" />
    </Button>
  );

  const columns = [
    {
      field: "fullname",
      headerName: "Full Name",
      width: 280,
      valueGetter: (params) => params.row.user_id?.fullname,
    },
    {
      field: "username",
      headerName: "Username",
      width: 220,
      valueGetter: (params) => params.row.user_id?.account_id?.username,
    },
    {
      field: "email",
      headerName: "Email",
      width: 280,
      valueGetter: (params) => params.row.user_id?.email,
    },
    {
      field: "action",
      headerName: "Action",
      disableExport: true,
      sortable: false,
      filterable: false,
      width: 180,
      renderCell: actionButton,
    },
  ];

  const { cid } = useParams();

  const [classes, setClasses] = useState([]);
  console.log("classes: ", classes);

  useEffect(() => {
    async function getClass() {
      const response = await apiGetClassById(cid);
      setClasses(response?.data);
    }

    getClass();
  }, [cid]);

  const [course, setCourse] = useState([]);
  const course_id = classes?.course_id?._id;

  const fetchCourse = async () => {
    try {
      if (course_id) {
        const response = await apiGetCourseByID(course_id);
        setCourse(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCourse();
  }, [course_id]);

  const [userEnrol, setUserEnrol] = useState([]);

  const fetchUserEnroledById = async () => {
    const response = await apiGetUserEnroledByClass(cid);
    setUserEnrol(response?.data);
  };

  useEffect(() => {
    fetchUserEnroledById();
  }, [cid]);

  const handleDelete = (eid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ffae00",
      cancelButtonColor: "#90c446",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await apiDeleteStudentEnroled(eid);

          Swal.fire("Deleted!", "The student has been deleted.", "success");
          fetchUserEnroledById();
        } catch (error) {
          Swal.fire("Fail!", "Delete fail", "error");
        }
      }
    });
  };

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    fetchUserEnroledById();
  };

  return (
    <>
      <div className="bg-white py-8">
        <div className="flex gap-8 px-5">
          <div className="w-[80%]">
            <div className="mb-4 px-6">
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                  className="text-second hover:text-black text-sm"
                  to={`/${path?.LISTDEPARTMENT}`}
                >
                  {course?.department_id?.department_name}
                </Link>
                <Link
                  className="text-second hover:text-black text-sm"
                  to={`/${path?.COURSE}/${course?._id}`}
                >
                  {course?.course_name}
                </Link>
                <Typography sx={{ fontSize: "14px" }} color="text.primary">
                  {classes?.class_name + " " + classes?.class_code}
                </Typography>
              </Breadcrumbs>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                marginBottom={2}
                paddingTop={4}
              >
                <div>
                  <Typography variant="h6" color="initial" fontWeight={"bold"}>
                    Sinh viên đã ghi danh
                  </Typography>
                  <Typography variant="h11" color="initial">
                    Sỉ số: {userEnrol?.length}
                  </Typography>
                </div>
                <Button
                  onClick={() => handleOpenModal()}
                  sx={{
                    backgroundColor: "#90c446",
                    "&:hover": { backgroundColor: "#5b9608" },
                    color: "white",
                  }}
                >
                  Thêm sinh viên
                </Button>
              </Box>
            </div>
            <Container maxWidth={"lg"}>
              <Box sx={{ height: 430, width: "100%" }}>
                <DataGrid
                  checkboxSelection
                  rows={userEnrol}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  slots={{ toolbar: GridToolbar }}
                  slotProps={{
                    toolbar: {
                      showQuickFilter: true,
                      csvOptions: {
                        utf8WithBom: true,
                        fileName: "Danh-sach-sinh-vien",
                        delimiter: ",",
                      },
                    },
                  }}
                  getRowId={(userEnrol) => userEnrol._id}
                  pageSizeOptions={[5]}
                  sx={{
                    "& div div div div div .MuiDataGrid-withBorderColor": {
                      borderBottomColor: "#ccc",
                    },
                    "& div .MuiDataGrid-columnHeaders": {
                      borderColor: "#ccc",
                    },
                    // Table head
                    "& div div div div div div div div .MuiDataGrid-columnHeaderTitle":
                      {
                        fontWeight: "700",
                        textTransform: "uppercase",
                      },

                    borderColor: "#ccc",
                    boxShadow: "1px 1px 5px 1px #ddd",
                    borderRadius: "5px",
                    fontSize: "14px",
                  }}
                />
              </Box>
            </Container>
          </div>
          <div className="w-[20%]">
            <RightNavigate></RightNavigate>
          </div>
        </div>
      </div>

      {openModal && (
        <ModalAddUser
          handleClose={handleCloseModal}
          open={openModal}
          classId={classes?._id}
        />
      )}
    </>
  );
};

export default UserEnroled;
