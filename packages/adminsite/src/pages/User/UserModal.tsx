import { userApi } from '@/api/user'
import { UserParams, UserInfo } from '@/api/user/type'
import useMessageApi from '@/hooks/useMessageApi '
import { ResponseData } from '@/type'
import { Modal, Button, Form, Input, Select, Space } from 'antd'
import UserUploadFile from './UserUploadFile'

interface UserModalProps {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<UserModalProps['isModalOpen']>>
  search: () => void
  initialValues?: UserInfo
  type: 'UPDATE' | 'CREATE'
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

  const onFinish = async (values: unknown) => {
    console.log(values)
    try {
      if (type === 'CREATE') {
        const params = values as UserParams
        await userApi.create(params)
        success('添加用户成功！')
      } else if (type === 'UPDATE') {
        const params = values as UserParams
        if (initialValues) {
          await userApi.update({ id: initialValues.id, ...params })
          success('修改用户成功！')
        }
      }
      setIsModalOpen(false)
      search()
    } catch (error) {
      const customError = error as ResponseData<unknown>
      warning(customError.message)
    }
  }
  const { contextHolder, warning, success } = useMessageApi()

  const onReset = () => {
    form.resetFields()
  }

  const formItems = [
    { name: 'username', label: 'Username' },
    { name: 'password', label: 'Password' },
    { name: 'nickname', label: 'Nickname' },
    { name: 'email', label: 'Email' }
  ]

  return (
    <>
      {contextHolder}
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} width={600}>
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          initialValues={initialValues}
        >
          <Form.Item>
            <UserUploadFile />
          </Form.Item>
          {formItems.map((formItem) => (
            <Form.Item key={formItem.name} name={formItem.name} label={formItem.label} rules={[{ required: true }]}>
              <Input placeholder="placeholder" allowClear />
            </Form.Item>
          ))}
          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Select placeholder="Select a option and change input text above" allowClear>
              <Option value="admin">admin</Option>
              <Option value="user">user</Option>
            </Select>
          </Form.Item>
          <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}>
            {({ getFieldValue }) =>
              getFieldValue('gender') === 'other' ? (
                <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              ) : null
            }
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
