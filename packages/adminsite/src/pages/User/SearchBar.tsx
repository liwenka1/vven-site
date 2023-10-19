import { UserFilters } from '@/api/user/type'
import { Button, Col, Form, Input, Row, Select, Space, theme } from 'antd'
import { useState } from 'react'
import CreateModal from './CreateModal'

const { Option } = Select

interface SearchBarProps {
  getUser: (params?: UserFilters) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ getUser }) => {
  const { token } = theme.useToken()
  const [form] = Form.useForm()

  const formStyle: React.CSSProperties = {
    maxWidth: 'none',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24
  }

  const formItems = [
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
    const params = values as UserFilters
    for (const key in params) {
      if (params[key as keyof UserFilters] === '') {
        delete params[key as keyof UserFilters]
      }
    }
    getUser(params)
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
      <CreateModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  )
}

export default SearchBar
