import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { apigetDepartmentWithCourse } from "../api/department";
import { apiGetTopic, apiGetTypeOfTopic } from "../api/topic";
import { apiGetCurrentUser } from "../api/user";
import { setDepartment } from "../redux/departmentSlice";
import { setTopic, setType } from "../redux/topicSlice";
import { setUser } from "../redux/userSlice";
import Footer from "./Footer";
import Header from "./Header";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    async function getInfoUser(accessToken) {
      if (accessToken) {
        const dataUser = await apiGetCurrentUser();
        dispatch(setUser(dataUser?.data));
      } else {
        navigate("/login");
      }
    }

    getInfoUser(accessToken);
  }, [accessToken]);

  useEffect(() => {
    async function getDepartmentWithCourses() {
      const dataDepartment = await apigetDepartmentWithCourse();
      dispatch(setDepartment(dataDepartment?.data));
    }

    getDepartmentWithCourses();
  }, []);

  useEffect(() => {
    async function getTopic() {
      const topic = await apiGetTopic();
      dispatch(setTopic(topic?.data));
    }

    getTopic();
  }, []);

  useEffect(() => {
    async function getTypeOfTopic() {
      const types = await apiGetTypeOfTopic();
      dispatch(setType(types?.data));
    }

    getTypeOfTopic();
  }, []);

  return (
    <>
      <div className="relative z-10 overflow-y-auto w-[90%] my-0 mx-auto pt-[25px]">
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
      <div className="fixed inset-0 bg_client z-0"></div>
      <IconButton
        onClick={scrollToTop}
        sx={{ position: "fixed" }}
        className={`bottom-0 right-4 z-50 bg-black ${
          isVisible ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        <KeyboardArrowUpIcon
          style={{ fontSize: "36px", backgroundColor: "#ffae00" }}
          className="rounded-full text-white"
        />
      </IconButton>
    </>
  );
};

export default Index;
