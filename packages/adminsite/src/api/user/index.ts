import { http } from '@/utils/request'
import { LoginParams, RegisterParams, ResetParams, Profile, UserFilters, UserInfo, UserCreateParams } from './type'
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
  },
  select: (params?: UserFilters) => {
    return http.post<ResponseData<UserInfo[]>>('user/select', params)
  },
  create: (params?: UserCreateParams) => {
    return http.post<ResponseData<void>>('user/create', params)
  },
  delete: (params?: UserFilters & { id: number }) => {
    return http.post<ResponseData<void>>('user/delete', params)
  },
  update: (params?: UserFilters & { id: number }) => {
    return http.post<ResponseData<void>>('user/update', params)
  }
}
