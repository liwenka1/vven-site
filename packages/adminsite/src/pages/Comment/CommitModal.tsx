import { userApi } from '@/api/user'
import { UserCreateOrUpdateFilters, UserWithoutPassword } from '@/api/user/type'
import useMessageApi from '@/hooks/useMessageApi '
import { ResponseData } from '@/type'
import { PlusOutlined } from '@ant-design/icons'
import { ModalForm, ProForm, ProFormSelect, ProFormText, ProFormUploadButton } from '@ant-design/pro-components'
import { Button, message } from 'antd'
import type { RcFile, UploadProps } from 'antd/es/upload/interface'

interface CommitModalProps {
  id?: number
  initialValues?: UserWithoutPassword
  type: 'UPDATE' | 'CREATE'
}

const CommitModal: React.FC<CommitModalProps> = ({ id, initialValues, type }) => {
  const { contextHolder, warning, success } = useMessageApi()

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

  const onFinish = async (values: unknown) => {
    const params = values as UserCreateOrUpdateFilters
    try {
      if (type === 'CREATE') {
        await userApi.create({ ...params })
        success('添加用户成功！')
      } else if (type === 'UPDATE') {
        if (initialValues) {
          await userApi.update({ id: initialValues.id, ...params })
          // if (initialValues.id === profile?.id) {
          //   setToken(null)
          //   setProfile(null)
          //   navigate('/login')
          // }
          success('修改用户成功！')
        }
      }
    } catch (error) {
      const customError = error as ResponseData<null>
      warning(customError.message)
    }
  }

  return (
    <>
      {contextHolder}
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
        onFinish={onFinish}
        initialValues={initialValues}
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
        <ProFormText width="md" name="username" label="Username" />
        <ProFormText width="md" name="email" label="Email" />
        {type === 'CREATE' && <ProFormText width="md" name="password" label="Password" />}
        <ProFormText width="md" name="nickname" label="Nickname" />
        <ProFormSelect
          width="md"
          options={[
            {
              value: 'ADMIN',
              label: 'admin'
            },
            {
              value: 'USER',
              label: 'user'
            }
          ]}
          name="role"
          label="Role"
        />
      </ModalForm>
    </>
  )
}

export default CommitModal
