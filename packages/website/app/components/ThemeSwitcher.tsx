import { useTheme } from 'next-themes'
import { RiSunFill, RiMoonFill } from 'react-icons/ri'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div className="cursor-pointer">
      {theme === 'dark' ? (
        <div onClick={() => setTheme('light')}>
          <RiSunFill size={20} />
        </div>
      ) : (
        <div onClick={() => setTheme('dark')}>
          <RiMoonFill size={20} />
        </div>
      )}
    </div>
  )
}

export default ThemeSwitcher
