import ClearIcon from "@mui/icons-material/Clear";
import SettingsIcon from "@mui/icons-material/Settings";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { Fragment, useState } from "react";
import RightNavigate from "../components/RightNavigate";

const rows = [
  {
    fullname: "Demo",
    username: "demo",
    email: "demo@gmail.com",
    maso: "123",
    role: "Sinh viên",
    lastvisit: "2 ngày trước",
  },
  {
    fullname: "Giáo Viên",
    username: "teacher",
    email: "teacher@gmail.com",
    maso: "00023",
    role: "Giáo viên",
    lastvisit: "2 phút trước",
  },
  {
    fullname: "Sinh viên",
    username: "demo",
    email: "demo@gmail.com",
    maso: "123",
    role: "Sinh viên",
    lastvisit: "2 ngày trước",
  },
];

const UserEnroled = () => {
  const [activeIconIndex, setActiveIconIndex] = useState([]);

  const handleClick = (index) => {
    if (activeIconIndex.includes(index)) {
      setActiveIconIndex(activeIconIndex.filter((i) => i !== index));
    } else {
      setActiveIconIndex([...activeIconIndex, index]);
    }
  };

  return (
    <>
      <div className="bg-white py-8">
        <div className="flex gap-8 px-5">
          <div className="w-[80%]">
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650, border: "solid 1px #ddd" }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Họ và tên</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="center">
                      Tên đăng nhập
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="center">
                      Địa chỉ email
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="center">
                      Mã số
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="center">
                      Vai trò
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="center">
                      Lần truy cập cuối vào khóa học
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="center">
                      Trạng thái
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        className="flex-col"
                      >
                        <img
                          src="../../src/assets/Logo.jpg"
                          alt=""
                          className="w-16 mx-auto"
                        />
                        <span>{row.fullname}</span>
                      </TableCell>
                      <TableCell align="center">{row.username}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.maso}</TableCell>
                      <TableCell align="center">{row.role}</TableCell>
                      <TableCell align="center">{row.lastvisit}</TableCell>
                      <TableCell align="right">
                        <span className="flex gap-4 justify-center text-second">
                          <Fragment>
                            <SettingsIcon
                              sx={{
                                fontSize: "20px",
                                cursor: "pointer",
                                "&:hover": { color: "#ffae00" },
                              }}
                            />
                            <ClearIcon
                              sx={{
                                fontSize: "20px",
                                cursor: "pointer",
                                "&:hover": { color: "#ffae00" },
                              }}
                            />
                          </Fragment>
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="w-[20%]">
            <RightNavigate></RightNavigate>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserEnroled;
