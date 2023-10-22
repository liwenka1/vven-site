import { message } from 'antd'

const useMessageApi = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const warning = (content: string) => {
    messageApi.open({
      type: 'warning',
      content: content
    })
  }
  const success = (content: string) => {
    messageApi.open({
      type: 'success',
      content: content
    })
  }
  return { contextHolder, warning, success }
}

export default useMessageApi
