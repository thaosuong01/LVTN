// assets
import { UsergroupAddOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Path } from 'constants/path';

// icons
const icons = {
  UsergroupAddOutlined,
  UnorderedListOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const role = {
  id: 'role',
  title: 'Quản lý vai trò',
  type: 'group',
  children: [
    {
      id: 'list-role',
      title: 'Danh sách vai trò',
      type: 'item',
      url: Path.Role,
      icon: icons.UnorderedListOutlined,
      breadcrumbs: false
    },
    {
      id: 'add-role',
      title: 'Thêm vai trò',
      type: 'item',
      url: Path.RoleAdd,
      icon: icons.UsergroupAddOutlined,
      breadcrumbs: false
    }
  ]
};

export default role;
