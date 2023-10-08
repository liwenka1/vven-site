import { Button } from '@nextui-org/button'
import { Avatar } from '@nextui-org/avatar'
import { ThemeSwitcher } from './components/ThemeSwitcher'

export default function Home() {
  return (
    <div>
      <Button color="primary" size="lg">
        Button
      </Button>
      <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
      <Avatar name="Junior" />
      <span className="text-red-500">123</span>
      <ThemeSwitcher />
    </div>
  )
}
