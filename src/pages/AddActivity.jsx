import React from "react";
import RightNavigate from "../components/RightNavigate";
import UploadDocument from "../components/UploadDocument";

const AddActivity = () => {
  return (
    <>
      <div className="bg-white py-8">
        <div className="flex gap-8 px-5">
          <div className="w-[80%]">
            <UploadDocument className="p-16 mt-2 border border-neutral-200 cursor-pointer" />
          </div>
          <div className="w-[20%]">
            <RightNavigate></RightNavigate>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddActivity;
