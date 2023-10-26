interface User {
  id: number
  username: string
  password: string
  nickname: string
  email: string
  createTime: Date
  avatarUrl: string
  role: string
}

export type UserWithoutPassword = Omit<User, 'password'>

export type UserSearchFilters = Partial<Omit<User & { role: 'admin' | 'user' }, 'password'>>

export type UserCreateOrUpdateFilters = Partial<Omit<User & { role: 'admin' | 'user' }, 'id' | 'createTime'>>

export type UserDeleteFilters = Pick<User, 'id'>

export type UserLoginParams = Pick<User, 'username' | 'password'>

export type UserRegisterParams = Pick<User, 'username' | 'password' | 'nickname' | 'email'>

export type UserResetParams = Pick<User, 'username' | 'password' | 'email'>
