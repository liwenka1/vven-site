import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import lazyLoad from './lazyLoad'
import BasicLayout from '@/components/Layout'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <BasicLayout />,
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
        element: lazyLoad(lazy(() => import('@/pages/User')))
      },
      {
        path: 'about',
        element: lazyLoad(lazy(() => import('@/pages/About')))
      }
    ]
  }
]

const browserRouter = createBrowserRouter(routes, {
  basename: '/'
})

export default browserRouter
