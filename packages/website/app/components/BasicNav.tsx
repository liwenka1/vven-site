'use client'

import { useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from '@nextui-org/react'
import Link from 'next/link'
import SearchButton from './SearchButton'
import ThemeSwitcher from './ThemeSwitcher'
import LoginButton from './LoginButton'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const BasicNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = ['Posts', 'Tags', 'About']

  const path = usePathname()

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="md:hidden" />
          <NavbarBrand>
            <Link className="font-bold text-inherit" href="/">
              VVenKAI
            </Link>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="hidden md:flex gap-4" justify="center">
          {menuItems.map((item, index) => (
            <NavbarItem key={`${item}-${index}`}>
              <Link
                className={clsx(`/${item.toLocaleLowerCase()}` === path && 'underline decoration-wavy underline-offset-4')}
                href={item.toLocaleLowerCase()}
              >
                {item}
              </Link>
            </NavbarItem>
          ))}
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
                className={clsx(`w-full`, `/${item.toLocaleLowerCase()}` === path && 'underline decoration-wavy underline-offset-4')}
                href={item.toLocaleLowerCase()}
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
