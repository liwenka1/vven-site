import useUserInfoStore from '@/stores/userInfo'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Descriptions, Modal } from 'antd'
import { DescriptionsProps } from 'antd/lib'

interface ProfileModalProps {
  isModalOpen: boolean
  setIsModalOpen: (isModalOpen: boolean) => void
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isModalOpen, setIsModalOpen }) => {
  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const { profile } = useUserInfoStore()

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'UserName',
      children: profile?.username
    },
    {
      key: '2',
      label: 'Email',
      children: profile?.email
    },
    {
      key: '3',
      label: 'NickName',
      children: profile?.nickname
    },
    {
      key: '4',
      label: 'Role',
      children: profile?.role
    }
  ]

  return (
    <>
      <Modal title="Profile" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Avatar className="cursor-pointer my-5 w-20 h-20" icon={<UserOutlined />} src={profile?.avatarUrl} size="large" />
        <Descriptions className="my-5" bordered items={items} size="small" column={1} />
      </Modal>
    </>
  )
}

export default ProfileModal
