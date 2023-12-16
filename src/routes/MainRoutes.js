import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import { Path } from 'constants/path';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - profile
// const Profile = Loadable(lazy(() => import('pages/profiles/Profile')));

// render - user
const User = Loadable(lazy(() => import('pages/user/User')));
const Teacher = Loadable(lazy(() => import('pages/user/Teacher')));
const Student = Loadable(lazy(() => import('pages/user/Student')));
const UserAdd = Loadable(lazy(() => import('pages/user/UserAdd')));
const UserEdit = Loadable(lazy(() => import('pages/user/UserEdit')));

// render - role
const Role = Loadable(lazy(() => import('pages/role/Role')));
const RoleAdd = Loadable(lazy(() => import('pages/role/RoleAdd')));
const RoleEdit = Loadable(lazy(() => import('pages/role/RoleEdit')));

// render - department
const Department = Loadable(lazy(() => import('pages/department/Department')));
const DepartmentAdd = Loadable(lazy(() => import('pages/department/DepartmentAdd')));
const DepartmentEdit = Loadable(lazy(() => import('pages/department/DepartmentEdit')));
const DepartmentDeleted = Loadable(lazy(() => import('pages/department/DepartmentDeleted')));

// render - course
const Course = Loadable(lazy(() => import('pages/course/Course')));
const CourseAdd = Loadable(lazy(() => import('pages/course/CourseAdd')));
const CourseEdit = Loadable(lazy(() => import('pages/course/CourseEdit')));
const CourseDeleted = Loadable(lazy(() => import('pages/course/CourseDeleted')));

// render - class
const Class = Loadable(lazy(() => import('pages/class/Class')));
const ClassDeleted = Loadable(lazy(() => import('pages/class/ClassDeleted')));

// render - document
const Document = Loadable(lazy(() => import('pages/document/Document')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },

    {
      path: 'user',
      children: [
        {
          index: true,
          element: <User />
        },
        {
          path: Path.Teacher,
          element: <Teacher />
        },
        {
          path: Path.Student,
          element: <Student />
        },
        {
          path: Path.UserAdd,
          element: <UserAdd />
        },
        {
          path: `${Path.UserEdit}/:id`,
          element: <UserEdit />
        }
      ]
    },
    {
      path: 'role',
      children: [
        {
          index: true,
          element: <Role />
        },
        {
          path: Path.RoleAdd,
          element: <RoleAdd />
        },
        {
          path: `${Path.RoleEdit}/:id`,
          element: <RoleEdit />
        }
      ]
    },
    {
      path: 'department',
      children: [
        {
          index: true,
          element: <Department />
        },
        {
          path: Path.DepartmentAdd,
          element: <DepartmentAdd />
        },
        {
          path: Path.DepartmentDeleted,
          element: <DepartmentDeleted />
        },
        {
          path: `${Path.DepartmentEdit}/:id`,
          element: <DepartmentEdit />
        }
      ]
    },
    {
      path: 'course',
      children: [
        {
          index: true,
          element: <Course />
        },
        {
          path: Path.CourseAdd,
          element: <CourseAdd />
        },
        {
          path: Path.CourseDeleted,
          element: <CourseDeleted />
        },
        {
          path: `${Path.CourseEdit}/:id`,
          element: <CourseEdit />
        }
      ]
    },
    {
      path: 'class',
      children: [
        {
          index: true,
          element: <Class />
        },
        {
          path: Path.ClassDeleted,
          element: <ClassDeleted />
        }
      ]
    },
    {
      path: 'document',
      children: [
        {
          index: true,
          element: <Document />
        }
      ]
    }
  ]
};

export default MainRoutes;
