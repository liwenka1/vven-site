import { userApi } from '@/api/user'
import { PlusOutlined } from '@ant-design/icons'
import {
  ModalForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton
} from '@ant-design/pro-components'
import { Button, message } from 'antd'
import type { RcFile, UploadProps } from 'antd/es/upload/interface'

interface CommitModalProps {
  id?: number
  type: 'UPDATE' | 'CREATE'
}

const CommitModal: React.FC<CommitModalProps> = ({ id, type }) => {
  const beforeUpload = (file: RcFile): boolean => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  const uploadFile: UploadProps['customRequest'] = async (options) => {
    const { file } = options
    const formData = new FormData()
    formData.append('file', file)
    if (id) {
      formData.append('id', String(id))
    }
    const res = await userApi.upload(formData)
    console.log(res)
  }

  return (
    <ModalForm
      trigger={
        type === 'CREATE' ? (
          <Button type="primary">
            <PlusOutlined />
            新增
          </Button>
        ) : (
          <a key="view">查看</a>
        )
      }
      onFinish={async (values: unknown) => {
        console.log(values)
        message.success('提交成功')
      }}
      initialValues={{
        name: '蚂蚁设计有限公司',
        useMode: 'chapter'
      }}
    >
      <ProForm.Group>
        <ProFormUploadButton
          name="avatar"
          label="Avatar"
          max={1}
          fieldProps={{
            name: 'avatar',
            listType: 'picture-card',
            showUploadList: false,
            beforeUpload: beforeUpload,
            customRequest: uploadFile
          }}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText name={['contract', 'name']} width="md" label="合同名称" placeholder="请输入名称" />
        <ProFormDateRangePicker width="md" name={['contract', 'createTime']} label="合同生效时间" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          options={[
            {
              value: 'chapter',
              label: '盖章后生效'
            }
          ]}
          readonly
          width="xs"
          name="useMode"
          label="合同约定生效方式"
        />
        <ProFormSelect
          width="xs"
          options={[
            {
              value: 'time',
              label: '履行完终止'
            }
          ]}
          name="unusedMode"
          label="合同约定失效效方式"
        />
      </ProForm.Group>
      <ProFormText width="sm" name="id" label="主合同编号" />
      <ProFormText name="project" width="md" disabled label="项目名称" initialValue="xxxx项目" />
      <ProFormText width="xs" name="mangerName" disabled label="商务经理" initialValue="启途" />
    </ModalForm>
  )
}

export default CommitModal
