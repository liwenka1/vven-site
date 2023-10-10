import useUserInfoStore from '@/stores/userInfo'
import { MenuFoldOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Avatar, Button, Dropdown } from 'antd'
import { useNavigate } from 'react-router-dom'

interface BasicHeaderProps {
  onClick: () => void
}

const BasicHeader: React.FC<BasicHeaderProps> = ({ onClick }) => {
  const { setUserInfo } = useUserInfoStore()
  const navigate = useNavigate()

  const handleLogOut = () => {
    setUserInfo(null)
    navigate('/login')
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span>个人中心</span>
    },
    {
      key: '2',
      label: <span onClick={handleLogOut}>退出登录</span>
    }
  ]

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
