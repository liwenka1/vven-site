import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig
} from 'axios'
import useUserInfoStore from '../stores/userInfo'

class Request {
  private instance: AxiosInstance
  // 存放取消请求控制器Map
  private abortControllerMap: Map<string, AbortController>

  constructor(config: CreateAxiosDefaults) {
    this.instance = axios.create(config)

    this.abortControllerMap = new Map()

    // 请求拦截器
    this.instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      // if (config.url !== '/login') {
      //   const token = useUserInfoStore.getState().userInfo?.token
      //   if (token) config.headers['x-token'] = token
      // }

      const controller = new AbortController()
      const url = config.url || ''
      config.signal = controller.signal
      this.abortControllerMap.set(url, controller)

      return config
    }, Promise.reject)

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const url = response.config.url || ''
        this.abortControllerMap.delete(url)

        if (response.data.status !== 200) {
          return Promise.reject(response.data)
        }

        return response.data.data
      },
      (err) => {
        if (err.response?.status === 401) {
          // 登录态失效，清空userInfo，跳转登录页
          useUserInfoStore.setState({ userInfo: null })
          window.location.href = `/login?redirect=${window.location.pathname}`
        }

        return Promise.reject(err)
      }
    )
  }

  request<T>(config: AxiosRequestConfig): Promise<T> {
    return this.instance.request(config)
  }

  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, config)
  }

  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post(url, data, config)
  }
}

export const http = new Request({
  timeout: 20 * 1000,
  baseURL: process.env.NEXT_PUBLIC_API_URL
})