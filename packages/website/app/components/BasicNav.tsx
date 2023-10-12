'use client'

import { useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link
} from '@nextui-org/react'
import SearchButton from './SearchButton'
import ThemeSwitcher from './ThemeSwitcher'
import LoginButton from './LoginButton'

const BasicNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = ['Posts', 'Tags', 'About']

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
          <LoginButton />
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
    </>
  )
}

export default BasicNav
