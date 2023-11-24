import { Route, Routes } from "react-router-dom";
import "./index.css";
import Index from "./layouts/Index";
import AddCourse from "./pages/AddCourse";
import ClassPage from "./pages/ClassPage";
import Course from "./pages/Course";
import CreatePractice from "./pages/CreatePractice";
import Department from "./pages/Department";
import DocumentPage from "./pages/DocumentPage";
import EnrolMethod from "./pages/EnrolMethod";
import Home from "./pages/Home";
import ListCourse from "./pages/ListCourse";
import Login from "./pages/Login";
import ManageCourse from "./pages/ManageCourse";
import NotFoundPage from "./pages/NotFound";
import PracticePage from "./pages/PracticePage";
import UserEnroled from "./pages/UserEnroled";
import { path } from "./utils/path";
import UpdatePractice from "./pages/UpdatePractice";
import ListCourseOfTeacher from "./pages/ListCourseOfTeacher";
import EnrolmentPage from "./pages/EnrolmentPage";
import ListMyCourse from "./pages/ListMyCourse";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Index />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={`${path.LISTCOURSE}/:did`} element={<ListCourse />} />
          <Route path={path.LISTMYCOURSE} element={<ListMyCourse />} />
          <Route
            path={path.LISTCOURSEOFTEACHER}
            element={<ListCourseOfTeacher />}
          />
          <Route path={`${path.COURSE}/:cid`} element={<Course />} />
          <Route path={`${path.CLASSPAGE}/:cid`} element={<ClassPage />} />
          <Route path={`${path.FOLDER}/:did`} element={<DocumentPage />} />
          <Route
            path={`${path.ENROLMENTPAGE}/:cid`}
            element={<EnrolmentPage />}
          />
          <Route path={path.ENROLMETHOD} element={<EnrolMethod />} />
          <Route path={path.ADDCOURSE} element={<AddCourse />} />
          <Route path={path.LISTDEPARTMENT} element={<Department />} />
          <Route path={`${path.USERENROLED}/:cid`} element={<UserEnroled />} />
          <Route path={path.CREATEPRACTICE} element={<CreatePractice />} />
          <Route
            path={`/${path.UPDATEPRACTICE}/:eid`}
            element={<UpdatePractice />}
          />
          <Route
            path={`${path.PRACTICEPAGE}/:pid`}
            element={<PracticePage />}
          />
          <Route
            path={`${path.MANAGECOURSE}/:did`}
            element={<ManageCourse />}
          />
        </Route>
        <Route path={path.NOTFOUND} element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
