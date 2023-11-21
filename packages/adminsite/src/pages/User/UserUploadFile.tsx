import { useState } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Avatar, message, Upload } from 'antd'
import type { RcFile, UploadProps } from 'antd/es/upload/interface'
import { userApi } from '@/api/user'

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
  onUploadSuccess: (id: number, url: string) => void
}

const UserUploadFile: React.FC<UserUploadFileProps> = ({ id, avatarUrl, onUploadSuccess }) => {
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
    onUploadSuccess(id, res.data)
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <>
      {avatarUrl ? (
        <Avatar src={avatarUrl} alt="avatar" size="small" />
      ) : (
        <Upload
          name="avatar"
          listType="picture-circle"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          customRequest={uploadFile}
        >
          {uploadButton}
        </Upload>
      )}
    </>
  )
}

export default UserUploadFile
