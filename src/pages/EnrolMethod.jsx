import ClearIcon from "@mui/icons-material/Clear";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
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
    method: "Tự ghi danh (Sinh viên)",
    members: "0",
    icons: ["remove", "eye", "setting"],
  },
  {
    method: "Đăng ký thủ công",
    members: "6",
    icons: ["add", "setting"],
  },
  {
    method: "Khách vãng lai",
    members: "0",
    icons: ["remove", "eye", "setting"],
  },
];

const EnrolMethod = () => {
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
        <div className="flex px-5 gap-8">
          <div className="w-[80%]">
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650, border: "solid 1px #ddd" }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Phương thức
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="center">
                      Thành viên
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="center">
                      Chỉnh sửa
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {row.method}
                      </TableCell>
                      <TableCell align="center">{row.members}</TableCell>
                      <TableCell align="right">
                        <span className="flex gap-4 justify-center text-second">
                          {row.icons.map((icon, iconIndex) => (
                            <Fragment key={iconIndex}>
                              {icon === "remove" && (
                                <ClearIcon
                                  sx={{
                                    fontSize: "20px",
                                    cursor: "pointer",
                                    "&:hover": { color: "#ffae00" },
                                  }}
                                />
                              )}
                              {icon === "add" && (
                                <PersonAddIcon
                                  sx={{
                                    fontSize: "20px",
                                    cursor: "pointer",
                                    "&:hover": { color: "#ffae00" },
                                  }}
                                />
                              )}
                              {icon === "eye" && (
                                <>
                                  {activeIconIndex.includes(index) ? (
                                    <VisibilityIcon
                                      sx={{
                                        fontSize: "20px",
                                        cursor: "pointer",
                                        "&:hover": { color: "#ffae00" },
                                      }}
                                      onClick={() => handleClick(index)}
                                    />
                                  ) : (
                                    <VisibilityOffIcon
                                      sx={{
                                        fontSize: "20px",
                                        cursor: "pointer",
                                        "&:hover": { color: "#ffae00" },
                                      }}
                                      onClick={() => handleClick(index)}
                                    />
                                  )}
                                </>
                              )}
                              {icon === "setting" && (
                                <SettingsIcon
                                  sx={{
                                    fontSize: "20px",
                                    cursor: "pointer",
                                    "&:hover": { color: "#ffae00" },
                                  }}
                                />
                              )}
                            </Fragment>
                          ))}
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

export default EnrolMethod;
