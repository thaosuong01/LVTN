// assets
import { UserAddOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Path } from 'constants/path';

// icons
const icons = {
  UserAddOutlined,
  UnorderedListOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const user = {
  id: 'user',
  title: 'Quản lý người dùng',
  type: 'group',
  children: [
    {
      id: 'list-user',
      title: 'Danh sách người dùng',
      type: 'item',
      url: Path.User,
      icon: icons.UnorderedListOutlined,
      breadcrumbs: false
    },
    {
      id: 'add-user',
      title: 'Thêm thông tin người dùng',
      type: 'item',
      url: Path.UserAdd,
      icon: icons.UserAddOutlined,
      breadcrumbs: false
    }
  ]
};

export default user;
