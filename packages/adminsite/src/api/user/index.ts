import { http } from '@/utils/request'
import { UserParams, UserInfo } from './type'
import { ResponseData } from '@/type'

export const userApi = {
  register: (params: UserParams) => {
    return http.post('/user/register', params)
  },
  login: (params: UserParams) => {
    return http.post<ResponseData<string>>('/user/login', params)
  },
  reset: (params: UserParams) => {
    return http.post('/user/reset', params)
  },
  profile: () => {
    return http.get<ResponseData<UserInfo>>('user/profile')
  },
  select: (params?: UserParams) => {
    return http.post<ResponseData<UserInfo[]>>('user/select', params)
  },
  create: (params: UserParams) => {
    return http.post<ResponseData<void>>('user/create', params)
  },
  delete: (params: UserParams & { id: number }) => {
    return http.post<ResponseData<void>>('user/delete', params)
  },
  update: (params: UserParams & { id: number }) => {
    return http.post<ResponseData<void>>('user/update', params)
  }
}
