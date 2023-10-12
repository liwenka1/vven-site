import { http } from '@/app/utils/request'
import { LoginParams, LoginData } from './type'

export const userApi = {
  login: (params: LoginParams) => {
    return http.post<LoginData>('/user/login', params)
  }
}
