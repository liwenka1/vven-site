import { userApi } from '@/api/user'
import { UserCreateOrUpdateFilters, UserWithoutPassword } from '@/api/user/type'
import useMessageApi from '@/hooks/useMessageApi '
import { ResponseData } from '@/type'
import { Modal, Button, Form, Input, Select, Space } from 'antd'
import UserUploadFile from './UserUploadFile'
import { useState } from 'react'
import useUserInfoStore from '@/stores/userInfo'
import { useNavigate } from 'react-router-dom'

interface UserModalProps {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<UserModalProps['isModalOpen']>>
  search: () => void
  initialValues?: UserWithoutPassword
  type: 'UPDATE' | 'CREATE'
}

interface FormItem {
  name: string
  label: string
}

const { Option } = Select

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
}

const UserModal: React.FC<UserModalProps> = ({ isModalOpen, setIsModalOpen, search, initialValues, type }) => {
  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const [form] = Form.useForm()
  const { profile, setToken, setProfile } = useUserInfoStore()
  const navigate = useNavigate()

  const onFinish = async (values: unknown) => {
    const params = values as UserCreateOrUpdateFilters
    try {
      if (type === 'CREATE') {
        await userApi.create({ ...params, avatarUrl })
        success('添加用户成功！')
      } else if (type === 'UPDATE') {
        if (initialValues) {
          await userApi.update({ id: initialValues.id, ...params, avatarUrl })
          if (initialValues.id === profile?.id) {
            setToken(null)
            setProfile(null)
            navigate('/login')
          }
          success('修改用户成功！')
        }
      }
      setIsModalOpen(false)
      search()
    } catch (error) {
      const customError = error as ResponseData<null>
      warning(customError.message)
    }
  }
  const { contextHolder, warning, success } = useMessageApi()

  const onReset = () => {
    form.resetFields()
    setAvatarUrl(initialValues?.avatarUrl)
  }

  const formItems: FormItem[] = [
    { name: 'username', label: 'Username' },
    { name: 'password', label: 'Password' },
    { name: 'nickname', label: 'Nickname' },
    { name: 'email', label: 'Email' }
  ]

  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(initialValues?.avatarUrl)
  const handleUploadSuccess = (url: string) => {
    setAvatarUrl(url)
  }

  return (
    <>
      {contextHolder}
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} width={600}>
        <Form
          {...layout}
          form={form}
          name="user"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          initialValues={initialValues}
        >
          <Form.Item label="Upload">
            <UserUploadFile id={initialValues?.id} avatarUrl={avatarUrl} onUploadSuccess={handleUploadSuccess} />
          </Form.Item>
          {formItems.map((formItem) => (
            <Form.Item key={formItem.name} name={formItem.name} label={formItem.label} rules={[{ required: true }]}>
              <Input placeholder="placeholder" allowClear />
            </Form.Item>
          ))}
          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Select placeholder="Select a option and change input text above" allowClear>
              <Option value="ADMIN">admin</Option>
              <Option value="USER">user</Option>
            </Select>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space size="small">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default UserModal
