export interface UserParams {
  avatar_url?: string
  username?: string
  password?: string
  nickname?: string
  email?: string
  role?: string
}

export interface UserInfo {
  id: number
  avatar_url: string
  username: string
  email: string
  nickname: string
  role: string
  create_time: Date
}
