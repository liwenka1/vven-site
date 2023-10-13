import { http } from '@/app/utils/request'
import { LoginParams, LoginData } from './type'
import { ResponseData } from '@/type'

export const userApi = {
  login: (params: LoginParams) => {
    return http.post<ResponseData<LoginData>>('/user/login', params)
  }
}
