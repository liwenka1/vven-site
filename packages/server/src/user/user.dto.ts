import { User } from '@prisma/client'

export type UserWithoutPassword = Omit<User, 'password'>

export interface UserFilters {
  avatar_url?: string
  username?: string
  password?: string
  nickname?: string
  email?: string
  role?: 'admin' | 'user'
}
