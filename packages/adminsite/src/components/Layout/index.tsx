import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import BasicHeader from '../Header'
import BasicSider from '../Sider'

const { Header, Sider, Content } = Layout

const BasicLayout = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(0, 0, 0, 0.2)',
            zIndex: 200
          }}
        />
        <BasicSider />
      </Sider>
      <Layout style={{ display: 'flex', flexDirection: 'column' }}>
        <Header style={{ background: '#fff', padding: 0 }}>
          <BasicHeader onClick={() => setCollapsed(!collapsed)} />
        </Header>
        <Content style={{ padding: '16px', flex: 1, overflowY: 'auto' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default BasicLayout
