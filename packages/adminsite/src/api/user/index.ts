import { http } from '@/utils/request'
import { LoginParams, RegisterParams } from './type'

export const userApi = {
  register: (params: RegisterParams) => {
    return http.post('/user/register', params)
  },
  login: (params: LoginParams) => {
    return http.post('/user/login', params)
  }
}
