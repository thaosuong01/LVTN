// assets
import { UnorderedListOutlined, HomeOutlined } from '@ant-design/icons';
import { Path } from 'constants/path';

// icons
const icons = {
  HomeOutlined,
  UnorderedListOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const department = {
  id: 'department',
  title: 'Quản lý khoa',
  type: 'group',
  children: [
    {
      id: 'list-department',
      title: 'Danh sách khoa',
      type: 'item',
      url: Path.Department,
      icon: icons.UnorderedListOutlined,
      breadcrumbs: false
    },
    {
      id: 'add-department',
      title: 'Thêm khoa',
      type: 'item',
      url: Path.DepartmentAdd,
      icon: icons.HomeOutlined,
      breadcrumbs: false
    }
  ]
};

export default department;
