import { ArticleWithTag, Tag } from '@/api/article/type'
import { Modal, Button, Form, Input, Select, Space } from 'antd'

const { Option } = Select

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
}

interface ArticleModalProps {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<ArticleModalProps['isModalOpen']>>
  search: () => void
  initialValues?: ArticleWithTag
  tags: Tag[]
  type: 'UPDATE' | 'CREATE'
}

interface FormItem {
  name: string
  label: string
}

const ArticleModal: React.FC<ArticleModalProps> = ({ isModalOpen, setIsModalOpen, initialValues, tags }) => {
  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const [form] = Form.useForm()
  const onFinish = async (values: unknown) => {
    console.log(values)
  }
  const onReset = () => {
    form.resetFields()
  }
  const formItems: FormItem[] = [
    { name: 'title', label: 'Title' },
    { name: 'author', label: 'Author' },
    { name: 'description', label: 'Description' }
  ]

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`)
  }

  return (
    <>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} width={600}>
        <Form
          {...layout}
          form={form}
          name="user"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          initialValues={initialValues}
        >
          {formItems.map((formItem) => (
            <Form.Item key={formItem.name} name={formItem.name} label={formItem.label} rules={[{ required: true }]}>
              <Input placeholder="placeholder" allowClear />
            </Form.Item>
          ))}
          <Form.Item name="tags" label="Tags" rules={[{ required: true }]}>
            <Select mode="tags" allowClear placeholder="Please select" onChange={handleChange}>
              {tags?.map((tag) => (
                <Select.Option key={tag.id} value={tag.name}>
                  {tag.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="isFeatured" label="IsFeatured" rules={[{ required: true }]}>
            <Select placeholder="Select a option and change input text above" allowClear>
              <Option value={true}>是</Option>
              <Option value={false}>否</Option>
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

export default ArticleModal
