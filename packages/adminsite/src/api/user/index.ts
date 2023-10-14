import { http } from '@/utils/request'
import { LoginParams, RegisterParams, ResetParams, Profile } from './type'
import { ResponseData } from '@/type'

export const userApi = {
  register: (params: RegisterParams) => {
    return http.post('/user/register', params)
  },
  login: (params: LoginParams) => {
    return http.post<ResponseData<string>>('/user/login', params)
  },
  reset: (params: ResetParams) => {
    return http.post('/user/reset', params)
  },
  profile: () => {
    return http.get<ResponseData<Profile>>('user/profile')
  }
}
