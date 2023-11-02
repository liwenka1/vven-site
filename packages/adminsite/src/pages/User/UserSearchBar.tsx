import { UserSearchFilters } from '@/api/user/type'
import { Button, Col, Form, Input, Row, Select, Space, theme } from 'antd'
import { useState } from 'react'
import UserModal from './UserModal'

const { Option } = Select

interface UserSearchBarProps {
  search: () => void
  searchParams: UserSearchFilters & { orderBy?: 'asc' | 'desc' }
  setSearchParams: React.Dispatch<React.SetStateAction<UserSearchBarProps['searchParams']>>
}

interface FormItem {
  name: string
  label: string
}

const UserSearchBar: React.FC<UserSearchBarProps> = ({ search, searchParams, setSearchParams }) => {
  const { token } = theme.useToken()
  const [form] = Form.useForm()

  const formStyle: React.CSSProperties = {
    maxWidth: 'none',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24
  }

  const formItems: FormItem[] = [
    { name: 'username', label: 'Username' },
    { name: 'nickname', label: 'Nickname' },
    { name: 'email', label: 'Email' }
  ]

  const getFields = () => {
    return (
      <>
        {formItems.map((formItem) => (
          <Col span={6} key={formItem.name}>
            <Form.Item
              name={formItem.name}
              label={formItem.label}
              rules={[
                {
                  required: false,
                  message: 'Input something!'
                }
              ]}
            >
              <Input placeholder="placeholder" allowClear />
            </Form.Item>
          </Col>
        ))}
        <Col span={6}>
          <Form.Item
            name="role"
            label="Role"
            rules={[
              {
                required: false,
                message: 'Select something!'
              }
            ]}
          >
            <Select allowClear>
              <Option value="admin">admin</Option>
              <Option value="user">user</Option>
            </Select>
          </Form.Item>
        </Col>
      </>
    )
  }

  const onFinish = (values: unknown) => {
    console.log('Received values of form: ', values)
    const params = values as UserSearchFilters
    setSearchParams({ ...searchParams, ...params })
    search()
  }

  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
        <Row gutter={24}>{getFields()}</Row>
        <div style={{ textAlign: 'right' }}>
          <Button type="primary" className="float-left" onClick={showModal}>
            add
          </Button>
          <Space size="small">
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button
              onClick={() => {
                form.resetFields()
              }}
            >
              Clear
            </Button>
          </Space>
        </div>
      </Form>
      <UserModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} search={search} type="CREATE" />
    </>
  )
}

export default UserSearchBar
