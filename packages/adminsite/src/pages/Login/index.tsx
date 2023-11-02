import { userApi } from '@/api/user'
import { UserLoginParams, UserRegisterParams, UserResetParams } from '@/api/user/type'
import useMessageApi from '@/hooks/useMessageApi '
import useUserInfoStore from '@/stores/userInfo'
import { ResponseData } from '@/type'
import { LockOutlined, MailOutlined, RedditOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Variant = 'LOGIN' | 'REGISTER' | 'RESET'

const Login = () => {
  const { token, setToken, setProfile } = useUserInfoStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [navigate, token])

  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const onFinish = async (values: unknown) => {
    try {
      setFormDisabled(true)
      if (variant === 'REGISTER') {
        const registerParams: UserRegisterParams = values as UserRegisterParams
        await userApi.register(registerParams)
        const loginParams: UserLoginParams = {
          username: registerParams.username,
          password: registerParams.password
        }
        login(loginParams)
      } else if (variant === 'RESET') {
        const resetParams: UserResetParams = values as UserResetParams
        await userApi.reset(resetParams)
        const loginParams: UserLoginParams = {
          username: resetParams.username,
          password: resetParams.password
        }
        login(loginParams)
      } else if (variant === 'LOGIN') {
        login(values as UserLoginParams)
      }
    } catch (error) {
      const customError = error as ResponseData<null>
      warning(customError.message)
    } finally {
      setFormDisabled(false)
    }
  }
  const login = async (loginParams: UserLoginParams) => {
    try {
      const token = await userApi.login(loginParams)
      setToken(token.data)
      const profile = await userApi.profile()
      setProfile(profile.data)
      navigate('/')
      success('登录成功！')
    } catch (error) {
      const customError = error as ResponseData<null>
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

  const { contextHolder, warning, success } = useMessageApi()

  const buttonTexts: { [key in Variant]: string } = {
    LOGIN: 'Sign in',
    REGISTER: 'Register',
    RESET: 'Reset'
  }

  return (
    <>
      {contextHolder}
      <div className="flex justify-center items-center w-full h-full bg-gray-100">
        <Form
          name="normal_login"
          className="w-[500px] bg-white pt-12 shadow rounded-lg px-10"
          initialValues={{ remember: true }}
          disabled={formDisabled}
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
              {buttonTexts[variant]}
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
