import { lazy } from 'react'
import { createBrowserRouter, Navigate, redirect } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import lazyLoad from './lazyLoad'
import BasicLayout from '@/components/Layout'
import Login from '@/pages/Login'
import useUserInfoStore from '@/stores/userInfo'

const authLoader = () => {
  const token = useUserInfoStore.getState().token

  if (!token) {
    return redirect(`/login?to=${window.location.pathname + window.location.search}`)
  }

  return null
}

const roleLoader = () => {
  const role = useUserInfoStore.getState().profile?.role

  if (role !== 'admin') {
    return redirect('/')
  }

  return null
}

const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <BasicLayout />,
    loader: authLoader,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />
      },
      {
        path: 'home',
        element: lazyLoad(lazy(() => import('@/pages/Home')))
      },
      {
        path: 'draft',
        element: lazyLoad(lazy(() => import('@/pages/Draft')))
      },
      {
        path: 'article',
        element: lazyLoad(lazy(() => import('@/pages/Article')))
      },
      {
        path: 'comment',
        element: lazyLoad(lazy(() => import('@/pages/Comment')))
      },
      {
        path: 'user',
        element: lazyLoad(lazy(() => import('@/pages/User'))),
        loader: roleLoader
      },
      {
        path: 'about',
        element: lazyLoad(lazy(() => import('@/pages/About')))
      },
      {
        path: '*',
        element: <Navigate to="/home" replace />
      }
    ]
  }
]

const browserRouter = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_BASE_URL
})

export default browserRouter
