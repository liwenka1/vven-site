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
      label: 'Live',
      children: 'Hangzhou, Zhejiang'
    },
    {
      key: '4',
      label: 'Remark',
      children: 'empty'
    },
    {
      key: '5',
      label: 'Address',
      children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China'
    }
  ]

  return (
    <>
      <Modal title="Profile" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Avatar className="cursor-pointer" icon={<UserOutlined />} />
        <Descriptions items={items} />
      </Modal>
    </>
  )
}

export default ProfileModal
