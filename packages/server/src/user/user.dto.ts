import { User } from '@prisma/client'

interface UserSearchOrderBy {
  orderBy?: {
    createTime?: 'asc' | 'desc'
  }
}

export type UserWithoutPassword = Omit<User, 'password'>

export type UserSearchFilters = Partial<Omit<User, 'password'>> &
  UserSearchOrderBy & { current?: number; pageSize?: number }

export type UserSearchData = { total: number; users: UserWithoutPassword[] }

export type UserCreateOrUpdateFilters = Partial<Omit<User, 'id' | 'createTime'>>

export type UserDeleteFilters = Pick<User, 'id'>

export type UserLoginParams = Pick<User, 'username' | 'password'>

export type UserRegisterParams = Pick<User, 'username' | 'password' | 'nickname' | 'email'>

export type UserResetParams = Pick<User, 'username' | 'password' | 'email'>
