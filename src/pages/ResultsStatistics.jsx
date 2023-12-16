import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { path } from "../utils/path";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { apiGetAllExamResult } from "../api/examResult";

const columns = [
  {
    field: "fullname",
    headerName: "Họ và tên",
    width: 280,
    valueGetter: (params) => params.row.user_id?.fullname,
  },
  {
    field: "attempt_count",
    headerName: "Số lần thi",
    width: 200,
  },
  {
    field: "numberOfCorrectAnswers",
    headerName: "Số câu đúng",
    width: 200,
  },
  {
    field: "numberOfIncorrectAnswers",
    headerName: "Số câu sai",
    width: 200,
  },
  {
    field: "numberOfQuestions",
    headerName: "Tổng số câu",
    width: 200,
  },
  {
    field: "totalPoints",
    headerName: "Tổng điểm",
    width: 200,
  },
];

const handleBackClick = () => {
  window.history.back(); // This will navigate back in the browser history
};

const ResultsStatistics = () => {
  const [examResultData, setexamResultData] = useState([]);
  console.log("examResultData: ", examResultData);
  const getExamResults = async () => {
    try {
      const response = await apiGetAllExamResult();
      // console.log("response: ", response);
      if (response.status === 200) {
        setexamResultData(response.data);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    getExamResults();
  }, []);
  const { exam_id } = useParams();
  return (
    <div className="bg-white py-8 px-8">
      <Link className=" hover:text-hover" to={`/${path.EXAM}/${exam_id}`}>
        Kiểm tra
      </Link>
      {examResultData.length > 0 && (
        <h2 className="text-xl font-bold my-2">
          {examResultData[0].exam_set_id?.set_name || ""}
        </h2>
      )}

      <DataGrid
        checkboxSelection
        rows={examResultData}
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
              fileName: "Danh-sach-ket-qua",
              delimiter: ",",
            },
          },
        }}
        getRowId={(examResultData) => examResultData._id}
        pageSizeOptions={[5]}
        sx={{
          "& div div div div div .MuiDataGrid-withBorderColor": {
            borderBottomColor: "#ccc",
          },
          "& div .MuiDataGrid-columnHeaders": {
            borderColor: "#ccc",
          },
          // Table head
          "& div div div div div div div div .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "700",
            textTransform: "uppercase",
          },

          borderColor: "#ccc",
          boxShadow: "1px 1px 5px 1px #ddd",
          borderRadius: "5px",
          fontSize: "14px",
        }}
      />

      <div className="flex justify-center mt-8">
        <button
          className="bg-primary text-white p-1 hover:bg-hover"
          variant="contained"
          onClick={handleBackClick}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ResultsStatistics;
