import { userApi } from '@/api/user'
import { LoginParams, RegisterParams } from '@/api/user/type'
import useUserInfoStore from '@/stores/userInfo'
import { CustomError } from '@/type'
import { LockOutlined, MailOutlined, RedditOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Variant = 'LOGIN' | 'REGISTER' | 'RESET'

const Login = () => {
  const { setUserInfo } = useUserInfoStore()
  const navigate = useNavigate()

  const onFinish = async (values: unknown) => {
    console.log('REGISTER:', values)
    try {
      if (variant === 'REGISTER') {
        const res = await userApi.register(values as RegisterParams)
        console.log(res)
      }
      if (variant === 'LOGIN') {
        const res = await userApi.login(values as LoginParams)
        setUserInfo(res as Record<string, unknown>)
        console.log(res)
      }
      navigate('/')
    } catch (error) {
      const customError = error as CustomError
      warning(customError.message)
    }
  }

  const [variant, setVariant] = useState<Variant>('LOGIN')
  const toggleVariantRegister = useCallback(() => {
    if (variant !== 'REGISTER') {
      setVariant('REGISTER')
    } else if (variant === 'REGISTER') {
      setVariant('LOGIN')
    }
  }, [variant])
  const toggleVariantReset = useCallback(() => {
    if (variant !== 'RESET') {
      setVariant('RESET')
    } else if (variant === 'RESET') {
      setVariant('LOGIN')
    }
  }, [variant])

  const [messageApi, contextHolder] = message.useMessage()
  const warning = (content: string) => {
    messageApi.open({
      type: 'warning',
      content: content
    })
  }

  return (
    <>
      {contextHolder}
      <div className="flex justify-center items-center w-full h-full bg-gray-100">
        <Form
          name="normal_login"
          className="w-[500px] bg-white pt-12 shadow rounded-lg px-10"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          {variant !== 'LOGIN' && (
            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                },
                {
                  required: true,
                  message: 'Please input your E-mail!'
                }
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
          )}
          {variant === 'REGISTER' && (
            <Form.Item name="nickname" rules={[{ required: true, message: 'Please input your Nickname!' }]}>
              <Input prefix={<RedditOutlined />} placeholder="Nickname" />
            </Form.Item>
          )}
          <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" className="w-full" htmlType="submit">
              {variant === 'LOGIN' && 'Sign in'}
              {variant === 'REGISTER' && 'Register'}
              {variant === 'RESET' && 'Reset'}
            </Button>
            <div className="flex gap-2 justify-center text-sm mt-6">
              <span> {variant === 'REGISTER' ? 'Alreacy have an account?' : 'New to Here'}</span>
              <a onClick={toggleVariantRegister}>{variant === 'REGISTER' ? 'Login' : 'Create an account'}</a>
            </div>
            <div className="flex gap-2 justify-center text-sm mt-4">
              Or
              <a onClick={toggleVariantReset}>{variant === 'RESET' ? 'Login' : 'Forgot password to reset'}</a>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default Login
