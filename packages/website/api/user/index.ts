import { http } from '@/app/utils/request'
import { LoginParams } from './type'

export const userApi = {
  login: (params: LoginParams) => {
    return http.post('/user/login', params)
  }
}
