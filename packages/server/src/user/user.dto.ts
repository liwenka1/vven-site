import { User } from '@prisma/client'

export type UserWithoutPassword = Omit<User, 'password'>

export type UserSearch = Partial<Pick<User, 'username' | 'nickname' | 'email' | 'role'>>

export interface UserFilters {
  avatar_url?: string
  username?: string
  password?: string
  nickname?: string
  email?: string
  role?: 'admin' | 'user'
}
