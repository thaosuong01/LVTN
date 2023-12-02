// assets
import { UnorderedListOutlined } from '@ant-design/icons';
import { Path } from 'constants/path';

// icons
const icons = {
  UnorderedListOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const document = {
  id: 'document',
  title: 'Quản lý tài liệu và bài giảng',
  type: 'group',
  children: [
    {
      id: 'list-document',
      title: 'Danh sách tài liệu và bài giảng',
      type: 'item',
      url: Path.Document,
      icon: icons.UnorderedListOutlined,
      breadcrumbs: false
    }
  ]
};

export default document;
