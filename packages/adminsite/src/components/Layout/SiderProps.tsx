import { CrownFilled, SmileFilled, TabletFilled } from '@ant-design/icons'

export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/home',
        name: '首页',
        icon: <SmileFilled />
      },
      {
        path: '/draft',
        name: '草稿管理',
        icon: <TabletFilled />
      },
      {
        path: '/article',
        name: '文章管理',
        icon: <TabletFilled />
      },
      {
        path: '/comment',
        name: '评论管理',
        icon: <TabletFilled />
      },
      {
        path: '/user',
        name: '用户管理',
        icon: <TabletFilled />
      },
      {
        path: '/about',
        name: '关于',
        icon: <TabletFilled />
      },
      {
        path: '/admin',
        name: '管理页',
        icon: <CrownFilled />,
        access: 'canAdmin',
        component: './Admin',
        routes: [
          {
            path: '/admin/sub-page1',
            name: '一级页面',
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
            component: './Welcome'
          },
          {
            path: '/admin/sub-page2',
            name: '二级页面',
            icon: <CrownFilled />,
            component: './Welcome'
          },
          {
            path: '/admin/sub-page3',
            name: '三级页面',
            icon: <CrownFilled />,
            component: './Welcome'
          }
        ]
      }
    ]
  },
  location: {
    pathname: '/'
  }
}
