import { MenuFoldOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Avatar, Button, Dropdown } from 'antd'

interface BasicHeaderProps {
  onClick: () => void
}

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <span>个人中心</span>
  },
  {
    key: '2',
    label: <span>退出登录</span>
  }
]

const BasicHeader: React.FC<BasicHeaderProps> = ({ onClick }) => {
  return (
    <div className="flex justify-between items-center h-full mr-10">
      <Button icon={<MenuFoldOutlined />} onClick={onClick} />
      <div>
        <Dropdown menu={{ items }} placement="bottomRight" arrow>
          <Avatar className="cursor-pointer" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </div>
  )
}

export default BasicHeader
