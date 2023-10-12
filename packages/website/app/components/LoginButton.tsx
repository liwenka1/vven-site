import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button, useDisclosure } from '@nextui-org/react'
import useUserInfoStore from '../stores/userInfo'
import LoginModal from './LoginModal'
import { useEffect, useState } from 'react'

const LoginButton = () => {
  const { userInfo, setUserInfo } = useUserInfoStore()
  const [isLogin, setIsLogin] = useState<boolean>(false)
  useEffect(() => {
    if (userInfo) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [userInfo, setUserInfo])
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const logout = () => {
    setUserInfo(null)
  }

  return (
    <>
      <Dropdown placement="bottom-end">
        {isLogin ? (
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
        ) : (
          <Button color="secondary" size="sm" onClick={onOpen}>
            Log In
          </Button>
        )}
        {isLogin && (
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">{userInfo?.username}</p>
              <p className="font-semibold">{userInfo?.email}</p>
            </DropdownItem>
            <DropdownItem key="settings" onClick={() => window.open(process.env.NEXT_PUBLIC_ADMIN_URL)}>
              My Settings
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={logout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        )}
      </Dropdown>
      <LoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  )
}

export default LoginButton
