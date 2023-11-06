// assets
import { ReadOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Path } from 'constants/path';

// icons
const icons = {
  ReadOutlined ,
  UnorderedListOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const course = {
  id: 'course',
  title: 'Quản lý khóa học',
  type: 'group',
  children: [
    {
      id: 'list-course',
      title: 'Danh sách khóa học',
      type: 'item',
      url: Path.Course,
      icon: icons.UnorderedListOutlined,
      breadcrumbs: false
    },
    {
      id: 'add-course',
      title: 'Thêm khóa học',
      type: 'item',
      url: Path.CourseAdd,
      icon: icons.ReadOutlined ,
      breadcrumbs: false
    }
  ]
};

export default course;
