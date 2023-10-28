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

export type UserLoginParams = Pick<User, 'username' | 'password'>
