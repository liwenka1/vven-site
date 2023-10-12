import { RiUserLine, RiLockPasswordLine } from 'react-icons/ri'
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input } from '@nextui-org/react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import { LoginParams } from '@/api/user/type'
import { userApi } from '@/api/user'
import useUserInfoStore from '../stores/userInfo'

interface LoginModalProps {
  isOpen: boolean
  onOpenChange: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onOpenChange }) => {
  const { setUserInfo } = useUserInfoStore()
  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      username: '',
      password: ''
    }
  })
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const loginParams: LoginParams = data as LoginParams
      const res = await userApi.login(loginParams)
      setUserInfo(res)
      onOpenChange()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" size="2xl" backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader></ModalHeader>
            <ModalBody>
              <Input
                id="username"
                placeholder="Username"
                labelPlacement="outside"
                startContent={<RiUserLine className="text-xl text-default-400 pointer-events-none flex-shrink-0" />}
                {...register('username', { required: true })}
              />
              <Input
                id="password"
                type="password"
                placeholder="Password"
                labelPlacement="outside"
                startContent={
                  <RiLockPasswordLine className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                {...register('password', { required: true })}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" type="submit">
                Sign In
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  )
}

export default LoginModal
