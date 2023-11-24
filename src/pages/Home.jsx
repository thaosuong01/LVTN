import { Divider } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ListCategory from "../components/ListCategory";
import ListMyCourse from "../components/ListMyCourse";
import RightNavigate from "../components/RightNavigate";
import { path } from "../utils/path";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  console.log();
  return (
    <>
      <div className="bg-white py-8">
        <div className="flex gap-8 px-5">
          <div className="w-[80%]">
            <div className="px-6 py-10 bg-white">
              <div>
                <h2 className="text-[#555] text-3xl font-semibold">
                  Course categories
                </h2>
                <Divider sx={{ my: 2, borderBottomWidth: 2 }}></Divider>
              </div>
              <div className="py-6 relative">
                <img
                  src="/../src/assets/category-bg.jpg"
                  className="h-40 w-full object-cover"
                  alt=""
                />
              </div>
              <ListCategory></ListCategory>
              {user && (
                <>
                  {user?.role_id?.role_name === "Student" && (
                    <ListMyCourse></ListMyCourse>
                  )}

                  {user?.role_id?.role_name === "Teacher" && (
                    <div className="flex justify-center mt-12">
                      <Link
                        to={`/${path.ADDCOURSE}`}
                        className="bg-button hover:bg-[#5b9608] text-white p-2 transition-all ease-in-out duration-150"
                      >
                        Thêm mới lớp học
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="w-[20%]">
            <RightNavigate></RightNavigate>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
