// assets
import { HomeOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Path } from 'constants/path';

// icons
const icons = {
  HomeOutlined ,
  UnorderedListOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const classes = {
  id: 'class',
  title: 'Quản lý lớp học',
  type: 'group',
  children: [
    {
      id: 'list-class',
      title: 'Danh sách lớp học',
      type: 'item',
      url: Path.Class,
      icon: icons.UnorderedListOutlined,
      breadcrumbs: false
    },
  ]
};

export default classes;
