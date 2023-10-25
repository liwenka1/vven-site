import { User } from '@prisma/client'

export type UserWithoutPassword = Omit<User, 'password'>

export type UserSearchFilters = Partial<Omit<User & { role: 'admin' | 'user' }, 'password'>>

export type UserCreateOrUpdateFilters = Partial<Omit<User & { role: 'admin' | 'user' }, 'id' | 'create_time'>>

export type UserDeleteFilters = Pick<User, 'id'>

export type UserLoginParams = Pick<User, 'username' | 'password'>

export type UserRegisterParams = Pick<User, 'username' | 'password' | 'nickname' | 'email'>

export type UserResetParams = Pick<User, 'username' | 'password' | 'email'>
