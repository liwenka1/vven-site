import React, { useState } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { message, Upload } from 'antd'
import type { RcFile, UploadProps } from 'antd/es/upload/interface'
import { userApi } from '@/api/user'

const beforeUpload = (file: RcFile) => {
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
  id?: number
  avatarUrl?: string
}

const UserUploadFile: React.FC<UserUploadFileProps> = ({ id, avatarUrl }) => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | undefined>(avatarUrl)

  const uploadFile: UploadProps['customRequest'] = async (options) => {
    const { file, onSuccess, onError } = options
    console.log(file, onSuccess, onError, id)
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('id', String(id))
    const res = await userApi.upload(formData)
    setLoading(false)
    setImageUrl(res.data)
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        customRequest={uploadFile}
      >
        {imageUrl ? (
          <img src={`http://localhost:4000${imageUrl}`} alt="avatar" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  )
}

export default UserUploadFile
