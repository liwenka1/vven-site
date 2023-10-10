import { ContainerOutlined, DesktopOutlined, PieChartOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem => {
  return {
    label,
    key,
    icon,
    children,
    type
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('首页', '/home', <PieChartOutlined />),
  getItem('草稿管理', '/draft', <DesktopOutlined />),
  getItem('文章管理', '/article', <DesktopOutlined />),
  getItem('评论管理', '/comment', <DesktopOutlined />),
  getItem('用户管理', '/user', <DesktopOutlined />),
  getItem('关于', '/about', <ContainerOutlined />)
]

const BasicSider = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key)
  }

  return (
    <div className="w-full h-full">
      <Menu onClick={handleMenuClick} selectedKeys={[pathname]} mode="inline" theme="light" items={items} />
    </div>
  )
}

export default BasicSider
