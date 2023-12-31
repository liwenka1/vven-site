import { http } from '@/utils/request'
import {
  UserWithoutPassword,
  UserSearchFilters,
  UserCreateOrUpdateFilters,
  UserDeleteFilters,
  UserLoginParams,
  UserRegisterParams,
  UserResetParams,
  UserSearchData
} from './type'
import { ResponseData } from '@/type'

export const userApi = {
  register: (params: UserRegisterParams) => {
    return http.post('/user/register', params)
  },
  login: (params: UserLoginParams) => {
    return http.post<ResponseData<string>>('/user/login', params)
  },
  reset: (params: UserResetParams) => {
    return http.post<ResponseData<void>>('/user/reset', params)
  },
  profile: () => {
    return http.get<ResponseData<UserWithoutPassword>>('user/profile')
  },
  search: (params?: UserSearchFilters) => {
    return http.post<ResponseData<UserSearchData>>('user/search', params)
  },
  create: (params: UserCreateOrUpdateFilters) => {
    return http.post<ResponseData<void>>('user/create', params)
  },
  update: (params: UserCreateOrUpdateFilters & { id: number }) => {
    return http.post<ResponseData<void>>('user/update', params)
  },
  delete: (params: UserDeleteFilters) => {
    return http.post<ResponseData<void>>('user/delete', params)
  },
  upload: (formData: FormData) => {
    return http.post<ResponseData<string>>('user/upload', formData)
  }
}
