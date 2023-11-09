import { Box, Container, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { apiGetExerciseById } from "../api/exercise";
import { apiGetAllExerciseSubmitByExerciseId } from "../api/exerciseSubmit";
import ModalEditSubmitExercise from "../components/ModalEditSubmitExercise";
import ModalSubmitExercise from "../components/ModalSubmitExercise";
import RightNavigate from "../components/RightNavigate";

dayjs.extend(duration);
dayjs.extend(relativeTime);

const PracticePage = () => {
  const { user } = useSelector((state) => state.user);
  const { pid } = useParams();
  const [exercise, setExercise] = useState({});
  const [exerciseSubmit, setExerciseSubmit] = useState([]);

  const [openModalSubmit, setOpenModalSubmit] = useState(false);
  const [openModalEditSubmit, setOpenModalEditSubmit] = useState(false);

  const getExerciseById = async (pid) => {
    const response = await apiGetExerciseById(pid);

    if (response?.status === 200) {
      setExercise(response?.data);
    }
  };

  const fetchExerciseSubmits = async (pid) => {
    const response = await apiGetAllExerciseSubmitByExerciseId(pid);
    if (response.status === 200) {
      setExerciseSubmit(response?.data);
    }
  };

  useEffect(() => {
    fetchExerciseSubmits(pid);
  }, [pid]);

  useEffect(() => {
    getExerciseById(pid);
  }, [pid]);

  const [exerciseOfStudent, setExerciseOfStudent] = useState({});
  useEffect(() => {
    setExerciseOfStudent(
      exerciseSubmit.filter(
        (item) => item?.student_id?._id === user?._id && item
      )[0]
    );
  }, [exerciseSubmit]);

  const handleOpenModalSubmit = () => {
    setOpenModalSubmit(true);
  };

  const handleCloseModalSubmit = () => {
    setOpenModalSubmit(false);
  };
  const handleOpenModalEditSubmit = () => {
    setOpenModalEditSubmit(true);
  };

  const handleCloseModalEditSubmit = () => {
    setOpenModalEditSubmit(false);
  };

  const remainingTime = (exercise) => {
    const deadline = dayjs(exercise.deadline);
    const currentTime = dayjs();
    const remainingTime = dayjs.duration(deadline.diff(currentTime));
    let formattedTime;
    if (currentTime.isAfter(deadline)) {
      const overdueTime = dayjs.duration(currentTime.diff(deadline));
      formattedTime =
        "Đã muộn " + overdueTime.format("D [ngày] H [giờ] m [phút]");
    } else {
      formattedTime = remainingTime.format("D [ngày] H [giờ] m [phút]");
    }

    return formattedTime;
  };

  const columns = [
    {
      field: "fullname",
      headerName: "Full Name",
      width: 150,
      valueGetter: (params) => params.row.student_id?.fullname,
    },
    {
      field: "username",
      headerName: "Username",
      width: 120,
      valueGetter: (params) => params.row.student_id?.account_id?.username,
    },
    {
      field: "student_id",
      headerName: "Email",
      width: 200,
      valueGetter: (params) => params.row.student_id?.email,
    },
    {
      field: "files",
      headerName: "Files",
      width: 350,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
    },
  ];

  return (
    <>
      <div className="bg-white py-8">
        <div className="flex gap-8 px-5">
          <div className="w-[80%]">
            {user?.role_id?.role_name === "Student" && (
              <div>
                <Typography
                  sx={{ fontSize: "24px", fontWeight: "bold", mb: 4 }}
                >
                  Trạng thái nộp
                </Typography>
                <div className="my-4 border">
                  <div className="flex bg-slate-200 p-2">
                    <Typography className="w-[30%]">Trạng thái nộp</Typography>
                    <span className="w-[70%]">
                      {exerciseOfStudent?.files?.length > 0
                        ? "Đã nộp"
                        : "Nothing has been sumitted for this assignment"}
                    </span>
                  </div>
                  <div className="flex p-2">
                    <Typography className="w-[30%]">
                      Tình trạng chấm điểm
                    </Typography>
                    <span className="w-[70%]">
                      {exerciseOfStudent?.exercise_score ?? "Chưa chấm điểm"}
                    </span>
                  </div>
                  <div className="flex bg-slate-200 p-2">
                    <Typography className="w-[30%]">Hạn chót</Typography>
                    <span className="w-[70%]">
                      {dayjs(exercise?.deadline).format(
                        "dddd, DD MMMM YYYY, hh:mm A"
                      )}
                    </span>
                  </div>
                  <div className="flex p-2">
                    <Typography className="w-[30%]">
                      Thời gian còn lại
                    </Typography>
                    <span className="w-[70%]">{remainingTime(exercise)}</span>
                  </div>
                  <div className="flex bg-slate-200 p-2">
                    <Typography className="w-[30%]">
                      Sửa đổi lần cuối
                    </Typography>
                    {exerciseOfStudent?.updatedAt ? (
                      <span className="w-[70%]">
                        {dayjs(exerciseOfStudent?.updatedAt).format(
                          "dddd, DD MMMM YYYY, hh:mm A"
                        )}
                      </span>
                    ) : (
                      "-"
                    )}
                  </div>
                  <div className="flex p-2">
                    <Typography className="w-[30%]">File đã nộp</Typography>
                    <div className="w-[70%] flex flex-col">
                      {exerciseOfStudent?.files?.map((file, index) => (
                        <Link
                          className="w-full"
                          to={`${
                            import.meta.env.VITE_SERVER_URL
                          }/exercise-submit/${file}`}
                          key={index}
                        >
                          {file}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  {exerciseOfStudent ? (
                    <button
                      onClick={() => handleOpenModalEditSubmit()}
                      type="submit"
                      className="bg-button text-white hover:bg-[#5b9608] transition-all ease-in-out duration-150 p-2"
                    >
                      Chỉnh sửa
                    </button>
                  ) : (
                    <button
                      onClick={() => handleOpenModalSubmit()}
                      type="submit"
                      className="bg-button text-white hover:bg-[#5b9608] transition-all ease-in-out duration-150 p-2"
                    >
                      Nộp bài
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Giảng viên */}
            {user?.role_id?.role_name === "Teacher" && (
              <div>
                <Typography fontSize={24} fontWeight={700}>
                  Bài tập 1
                </Typography>

                <Container maxWidth={"lg"}>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    marginBottom={2}
                  >
                    <Typography
                      variant="h6"
                      color="initial"
                      fontWeight={"bold"}
                    >
                      Danh sách kết quả
                    </Typography>
                  </Box>
                  <Box sx={{ height: 430, width: "100%" }}>
                    <DataGrid
                      checkboxSelection
                      rows={exerciseSubmit}
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
                        },
                      }}
                      getRowId={(exerciseSubmit) => exerciseSubmit._id}
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
            )}
          </div>
          <div className="w-[20%]">
            <RightNavigate></RightNavigate>
          </div>
        </div>
      </div>

      {/* Model add & edit submit exercise */}
      {openModalSubmit && (
        <ModalSubmitExercise
          open={openModalSubmit}
          handleClose={handleCloseModalSubmit}
          pid={pid}
          student_id={user?._id}
          fetchExerciseSubmits={fetchExerciseSubmits}
        />
      )}

      {openModalEditSubmit && (
        <ModalEditSubmitExercise
          fetchExerciseSubmits={fetchExerciseSubmits}
          open={openModalEditSubmit}
          student_id={user?._id}
          pid={pid}
          handleClose={handleCloseModalEditSubmit}
        />
      )}
    </>
  );
};

export default PracticePage;
