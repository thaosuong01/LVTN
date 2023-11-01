import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TransitionGroup } from "react-transition-group";
import { apiGetClassById } from "../api/class";
import ListDocument from "../components/ListDocument";
import RightNavigate from "../components/RightNavigate";
import { toggleEditMode } from "../redux/courseSlice";

const ClassPage = () => {
  const dispatch = useDispatch();

  const { isEditMode } = useSelector((state) => state.course);

  const handleToggleEditingMode = () => {
    dispatch(toggleEditMode());
  };

  const { user } = useSelector((state) => state.user);

  const { cid } = useParams();

  const [classes, setClasses] = useState();
  useEffect(() => {
    async function getClass() {
      const response = await apiGetClassById(cid);
      setClasses(response?.data);
    }

    getClass();
  }, [cid]);

  return (
    <>
      <div className="bg-white py-8">
        <div className="flex gap-8 px-5">
          <div className="w-[80%]">
            <TransitionGroup>
              <ListDocument></ListDocument>
            </TransitionGroup>
          </div>
          <div className="w-[20%]">
            <div>
              {user?._id === classes?.owner && (
                <Button
                  sx={{
                    backgroundColor: "#90c446",
                    color: "white",
                    "&:hover": { backgroundColor: "#5b9608" },
                    borderRadius: 0,
                    mb: 2,
                  }}
                  onClick={handleToggleEditingMode}
                >
                  {isEditMode ? "Tắt chế độ chỉnh sửa" : "Bật chế độ chỉnh sửa"}
                </Button>
              )}
            </div>
            <RightNavigate></RightNavigate>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassPage;
