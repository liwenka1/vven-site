import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig
} from 'axios'
import useUserInfoStore from '@/stores/userInfo'

class Request {
  private instance: AxiosInstance
  // 存放取消请求控制器Map
  private abortControllerMap: Map<string, AbortController>

  constructor(config: CreateAxiosDefaults) {
    this.instance = axios.create(config)

    this.abortControllerMap = new Map()

    // 请求拦截器
    this.instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      if (useUserInfoStore.getState().token) {
        const token = useUserInfoStore.getState().token
        if (token) config.headers['x-token'] = `Bearer ${token}`
      }

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

        return response.data
      },
      (err) => {
        if (err.response?.status === 401) {
          // 登录态失效，清空userInfo，跳转登录页
          useUserInfoStore.setState({ token: null, profile: null })
          window.location.href = `/login?redirect=${window.location.pathname}`
        }

        return Promise.reject(err)
      }
    )
  }

  // 取消全部请求
  cancelAllRequest() {
    this.abortControllerMap.forEach((controller) => {
      controller.abort()
    })
    this.abortControllerMap.clear()
  }

  // 取消指定的请求
  cancelRequest(url: string | string[]) {
    const urlList = Array.isArray(url) ? url : [url]
    for (const _url of urlList) {
      this.abortControllerMap.get(_url)?.abort()
      this.abortControllerMap.delete(_url)
    }
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
  baseURL: import.meta.env.VITE_API_URL
})
