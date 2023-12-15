import { Clear } from "@mui/icons-material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Typography,
  styled,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { apiGetClassById } from "../api/class";
import { apiGetCourseByID } from "../api/course";
import {
  apiAddManyStudentToClass,
  apiDeleteStudentEnroled,
  apiGetUserEnroledByClass,
} from "../api/enrol";
import ModalAddUser from "../components/ModalAddUser";
import RightNavigate from "../components/RightNavigate";
import { path } from "../utils/path";
import Papa from "papaparse";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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

  const [fileKey, setFileKey] = useState(0);
  const [classes, setClasses] = useState([]);

  // Get class
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

  const HandleImportCSV = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      //Check type file
      if (file.type !== "text/csv") {
        Swal.fire({ text: "Chỉ chấp nhận file csv!" });
        return;
      }
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true, // Bỏ qua các dòng trống
        encoding: "UTF-8",
        complete: async function (result) {
          setFileKey(fileKey + 1);
          let rawCSV = result.data;
          if (rawCSV.length > 0) {
            const usernameInserts = [];

            const userEnrolled = userEnrol?.map(
              (t) => t?.user_id?.account_id?.username
            );

            rawCSV.forEach((raw) => {
              console.log(`raw`, raw);
              if (!userEnrolled.includes(raw?.username)) {
                usernameInserts.push(raw.username);
              }
            });

            try {
              const response = await apiAddManyStudentToClass({
                class_id: cid,
                usernameInserts,
              });
              if (response) {
                Swal.fire({ text: "Thêm thành công" }).then(() => {
                  fetchUserEnroledById();
                });
              }
            } catch (error) {
              console.log("error: ", error);
              Swal.fire({
                text: error?.response?.data?.message || "Đã có lỗi xãy ra!",
              });
            }
          } else {
            Swal.fire({ text: "Không tìm thấy dữ liệu trong file csv" });
          }
        },
      });
    }
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
                <div className="space-x-2">
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                  >
                    Import
                    <VisuallyHiddenInput
                      key={fileKey}
                      onChange={(e) => HandleImportCSV(e)}
                      type="file"
                    />
                  </Button>
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
                </div>
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
