import useUserInfoStore from '@/stores/userInfo'
import { MenuFoldOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Avatar, Button, Dropdown } from 'antd'
import { useNavigate } from 'react-router-dom'
import ProfileModal from './profileModal'
import { useState } from 'react'

interface BasicHeaderProps {
  onClick: () => void
}

const BasicHeader: React.FC<BasicHeaderProps> = ({ onClick }) => {
  const { setToken, setProfile } = useUserInfoStore()
  const navigate = useNavigate()

  const handleLogOut = () => {
    setToken(null)
    setProfile(null)
    navigate('/login')
  }

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span onClick={showModal}>profile</span>
    },
    {
      key: '2',
      label: <span onClick={handleLogOut}>log out</span>
    }
  ]

  return (
    <div className="flex justify-between items-center h-full mr-10">
      <Button icon={<MenuFoldOutlined />} onClick={onClick} />
      <div>
        <ProfileModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <Dropdown menu={{ items }} placement="bottomRight" arrow>
          <Avatar className="cursor-pointer" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </div>
  )
}

export default BasicHeader
