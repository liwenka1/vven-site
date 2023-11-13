import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Button, Dropdown } from 'antd'
import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components'
import { GithubFilled, InfoCircleFilled, QuestionCircleFilled } from '@ant-design/icons'
import type { ProSettings } from '@ant-design/pro-components'
import type { MenuProps } from 'antd'
import SiderProps from './SiderProps'
import ProfileModal from '../Header/profileModal'
import useUserInfoStore from '@/stores/userInfo'

// const { Header, Sider, Content } = Layout

const BasicLayout = () => {
  const settings: ProSettings | undefined = {
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: false
  }
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const { profile, setToken, setProfile } = useUserInfoStore()
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleLogOut = () => {
    setToken(null)
    setProfile(null)
    navigate('/login')
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span onClick={showModal}>profile</span>
    },
    {
      key: '2',
      label: <span onClick={handleLogOut}>log out</span>
    }
  ]

  return (
    // <Layout style={{ height: '100vh' }}>
    //   <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
    //     <div
    //       style={{
    //         height: 32,
    //         margin: 16,
    //         background: 'rgba(0, 0, 0, 0.2)',
    //         zIndex: 200
    //       }}
    //     />
    //     <BasicSider />
    //   </Sider>
    //   <Layout style={{ display: 'flex', flexDirection: 'column' }}>
    //     <Header>
    //       <BasicHeader onClick={() => setCollapsed(!collapsed)} />
    //     </Header>
    //     <Content style={{ padding: '16px', flex: 1, overflowY: 'auto' }}>
    //       <Outlet />
    //     </Content>
    //   </Layout>
    // </Layout>
    <div id="ant-pro-layout" style={{ height: '100vh' }}>
      <ProLayout
        {...SiderProps}
        location={{
          pathname
        }}
        menu={{
          type: 'group'
        }}
        avatarProps={{
          src: profile?.avatarUrl,
          size: 'small',
          title: profile?.username,
          render: (props, dom) => {
            console.log(props)
            return (
              <div>
                <ProfileModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                <Dropdown menu={{ items }} placement="bottomRight" arrow>
                  {dom}
                </Dropdown>
              </div>
            )
          }
        }}
        actionsRender={(props) => {
          if (props.isMobile) return []
          return [
            <InfoCircleFilled key="InfoCircleFilled" />,
            <QuestionCircleFilled key="QuestionCircleFilled" />,
            <GithubFilled key="GithubFilled" />
          ]
        }}
        menuFooterRender={(props) => {
          if (props?.collapsed) return undefined
          return (
            <div
              style={{
                textAlign: 'center',
                paddingBlockStart: 12
              }}
            >
              <div>© 2021 Made with love</div>
              <div>by Ant Design</div>
            </div>
          )
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              navigate(item.path || '/home')
            }}
          >
            {dom}
          </a>
        )}
        {...settings}
        locale="zh-CN"
      >
        <PageContainer
          breadcrumb={{
            routes: []
          }}
          onBack={() => navigate(-1)}
          extra={[
            <Button key="3">操作</Button>,
            <Button key="2">操作</Button>,
            <Button key="1" type="primary">
              主操作
            </Button>
          ]}
        >
          <ProCard
            style={{
              height: '100%',
              minHeight: 600
            }}
          >
            <Outlet />
          </ProCard>
        </PageContainer>
      </ProLayout>
    </div>
  )
}

export default BasicLayout
