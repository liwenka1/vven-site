'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { HiSun, HiMoon } from 'react-icons/hi'

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="hidden md:flex cursor-pointer">
      {theme === 'dark' ? (
        <div onClick={() => setTheme('light')}>
          <HiSun size={25} />
        </div>
      ) : (
        <div onClick={() => setTheme('dark')}>
          <HiMoon size={25} />
        </div>
      )}
    </div>
  )
}
