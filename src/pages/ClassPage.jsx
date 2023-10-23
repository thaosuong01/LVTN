import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TransitionGroup } from "react-transition-group";
import ListDocument from "../components/ListDocument";
import RightNavigate from "../components/RightNavigate";
import { toggleEditMode } from "../redux/courseSlice";
import { apiGetClass, apiGetClassById } from "../api/class";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ClassPage = () => {
  const dispatch = useDispatch();

  const { isEditMode } = useSelector((state) => state.course);
  console.log(isEditMode);

  const handleToggleEditingMode = () => {
    dispatch(toggleEditMode());
  };

  const { user } = useSelector((state) => state.user);

  console.log(user?._id);

  const { cid } = useParams();

  const [classes, setClasses] = useState();
  useEffect(() => {
    async function getClass() {
      const response = await apiGetClassById(cid);
      setClasses(response?.data);
    }

    getClass();
  }, [cid]);

  console.log(classes?.owner);

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
