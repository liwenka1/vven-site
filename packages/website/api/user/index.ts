import { http } from '@/app/utils/request'
import { UserLoginParams, UserWithoutPassword } from './type'
import { ResponseData } from '@/type'

export const userApi = {
  login: (params: UserLoginParams) => {
    return http.post<ResponseData<string>>('/user/login', params)
  },
  profile: () => {
    return http.get<ResponseData<UserWithoutPassword>>('user/profile')
  }
}
