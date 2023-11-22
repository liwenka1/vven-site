import { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { Avatar, Button, message, Upload } from 'antd'
import type { RcFile, UploadProps } from 'antd/es/upload/interface'
import { userApi } from '@/api/user'
import { ProCoreActionType } from '@ant-design/pro-components'

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

interface UserUploadFileProps {
  id: number
  avatarUrl?: string
  action?: ProCoreActionType
}

const UserUploadFile: React.FC<UserUploadFileProps> = ({ id, avatarUrl, action }) => {
  const [loading, setLoading] = useState(false)

  const uploadFile: UploadProps['customRequest'] = async (options) => {
    const { file } = options
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)
    if (id) {
      formData.append('id', String(id))
    }
    const res = await userApi.upload(formData)
    setLoading(false)
    await userApi.update({ id: id, avatarUrl: res.data })
    action?.reload()
  }

  return (
    <div className="flex items-center justify-center">
      <Avatar src={avatarUrl} alt="avatar" size="small" />
      <Upload
        name="avatar"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        customRequest={uploadFile}
      >
        {
          <Button type="link" loading={loading} icon={<UploadOutlined />}>
            {avatarUrl ? 'Update Avatar' : 'Upload Avatar'}
          </Button>
        }
      </Upload>
    </div>
  )
}

export default UserUploadFile
