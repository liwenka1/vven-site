import { Button, Col, Form, Input, Row, Select, Space, theme } from 'antd'
import { ArticleSearchFilters } from '@/api/article/type'
import { useState } from 'react'
import ArticleModal from './ArticleModal'

const { Option } = Select

interface Tag {
  id: number
  name: string
}

interface ArticleSearchBarProps {
  search: () => void
  searchParams: ArticleSearchFilters
  setSearchParams: React.Dispatch<React.SetStateAction<ArticleSearchBarProps['searchParams']>>
  tags: Tag[]
}

interface FormItem {
  name: string
  label: string
}

const ArticleSearchBar: React.FC<ArticleSearchBarProps> = ({ search, tags }) => {
  const { token } = theme.useToken()
  const [form] = Form.useForm()

  const formStyle: React.CSSProperties = {
    maxWidth: 'none',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24
  }

  const formItems: FormItem[] = [
    { name: 'title', label: 'Title' },
    { name: 'author', label: 'Author' },
    { name: 'description', label: 'Description' }
  ]

  const getFields = () => {
    return (
      <>
        {formItems.map((formItem) => (
          <Col span={8} key={formItem.name}>
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
        <Col span={8}>
          <Form.Item
            name="isFeatured"
            label="IsFeatured"
            rules={[
              {
                required: false,
                message: 'Select something!'
              }
            ]}
          >
            <Select allowClear>
              <Option value="true">是</Option>
              <Option value="false">否</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
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
              {tags.map((tag) => (
                <Option value={tag.id}>{tag.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </>
    )
  }

  const onFinish = (values: unknown) => {
    console.log('Received values of form: ', values)
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
      <ArticleModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} search={search} type="CREATE" />
    </>
  )
}

export default ArticleSearchBar
