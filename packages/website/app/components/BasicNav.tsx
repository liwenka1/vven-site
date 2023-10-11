'use client'

import { useEffect, useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input
} from '@nextui-org/react'
import SearchButton from './SearchButton'
import ThemeSwitcher from './ThemeSwitcher'
import useUserInfoStore from '../stores/userInfo'
import { RiUserLine, RiLockPasswordLine } from 'react-icons/ri'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import { LoginParams } from '@/api/user/type'
import { userApi } from '@/api/user'

const BasicNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = ['Posts', 'Tags', 'About']

  const [isLogin, setIsLogin] = useState<boolean>(false)
  const { userInfo, setUserInfo } = useUserInfoStore()
  useEffect(() => {
    if (userInfo) {
      setIsLogin(true)
    }
  }, [userInfo])
  const logout = () => {
    setUserInfo(null)
    setIsLogin(false)
  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

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
      setUserInfo(res as Record<string, unknown>)
      setIsLogin(true)
      onOpenChange()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="md:hidden" />
          <NavbarBrand>
            <p className="font-bold text-inherit">VVenKAI</p>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="hidden md:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/">
              Posts
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="/" aria-current="page">
              Tags
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/">
              About
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent as="div" className="items-center" justify="end">
          <ThemeSwitcher />
          <SearchButton />
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
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={logout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={index === 2 ? 'primary' : index === menuItems.length - 1 ? 'danger' : 'foreground'}
                className="w-full"
                href="/"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
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
    </>
  )
}

export default BasicNav
