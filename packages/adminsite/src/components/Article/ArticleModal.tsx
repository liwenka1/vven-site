import { Modal } from 'antd'

interface ArticleModalProps {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<ArticleModalProps['isModalOpen']>>
  search: () => void
  type: 'UPDATE' | 'CREATE'
}

const ArticleModal: React.FC<ArticleModalProps> = ({ isModalOpen, setIsModalOpen }) => {
  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} width={600}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  )
}

export default ArticleModal
