import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ModalSubmitExercise from "../components/ModalSubmitExercise";
import RightNavigate from "../components/RightNavigate";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const PracticePage = () => {
  const { user } = useSelector((state) => state.user);
  console.log("user: ", user);
  const [openModalSubmit, setOpenModalSubmit] = useState(false);

  const handleOpenModalSubmit = () => {
    setOpenModalSubmit(true);
  };

  const handleCloseModalSubmit = () => {
    setOpenModalSubmit(false);
  };
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
                <div className="my-4 p-2">
                  <div className="flex bg-slate-200 p-2">
                    <Typography className="w-[30%]">Trạng thái nộp</Typography>
                    <span className="w-[70%]">
                      Nothing has been sumitted for this assignment
                    </span>
                  </div>
                  <div className="flex p-2">
                    <Typography className="w-[30%]">
                      Tình trạng chấm điểm
                    </Typography>
                    <span className="w-[70%]">Not graded</span>
                  </div>
                  <div className="flex bg-slate-200 p-2">
                    <Typography className="w-[30%]">Hạn chót</Typography>
                    <span className="w-[70%]">
                      Saturday, 10 November 2023, 12:00 AM
                    </span>
                  </div>
                  <div className="flex p-2">
                    <Typography className="w-[30%]">
                      Thời gian còn lại
                    </Typography>
                    <span className="w-[70%]">9 ngày 1 giờ 10 phút</span>
                  </div>
                  <div className="flex bg-slate-200 p-2">
                    <Typography className="w-[30%]">
                      Sửa đổi lần cuối
                    </Typography>
                    <span className="w-[70%]">-</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => handleOpenModalSubmit()}
                    type="submit"
                    className="bg-button text-white hover:bg-[#5b9608] transition-all ease-in-out duration-150 p-2"
                  >
                    Nộp bài
                  </button>
                </div>
              </div>
            )}

            {/* Giảng viên */}
            {user?.role_id?.role_name === "Teacher" && (
              <div>
                <Typography fontSize={24} fontWeight={700}>
                  Bài tập 1
                </Typography>

                <div className="my-4">
                  <div className="flex justify-between items-center mb-4">
                    <Typography fontSize={20} fontWeight={700}>
                      Danh sách kết quả
                    </Typography>
                    <button className="bg-button text-white hover:bg-[#5b9608] transition-all ease-in-out duration-150 p-1">
                      Xuất file
                    </button>
                  </div>
                  <div className="my-2">
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 700 }}
                        aria-label="customized table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Họ và tên
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Mã số sinh viên
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Email
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Kết quả
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Trạng thái
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableCell>Nhan Chí Danh</TableCell>
                          <TableCell>B1910196</TableCell>
                          <TableCell>nhanchidanh@gmail.com</TableCell>
                          <TableCell>files.pdf</TableCell>
                          <TableCell>Đã nộp</TableCell>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="w-[20%]">
            <RightNavigate></RightNavigate>
          </div>
        </div>
      </div>

      <ModalSubmitExercise
        open={openModalSubmit}
        handleClose={handleCloseModalSubmit}
      ></ModalSubmitExercise>
    </>
  );
};

export default PracticePage;
