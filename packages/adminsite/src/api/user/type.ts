export interface CommonUserParams {
  username: string
  password: string
}

export interface RegisterParams extends CommonUserParams {
  nickname: string
  email: string
}

export interface LoginParams extends CommonUserParams {}

export interface ResetParams extends CommonUserParams {
  email: string
}

export interface Profile {
  id: number
  username: string
  nickname: string
  email: string
  create_time: string
  avatar_url: string
  role: string
  iat: number
  exp: number
}

export interface UserFilters {
  username?: string
  nickname?: string
  email?: string
  role?: string
}

export interface UserInfo {
  avatar_url: string
  username: string
  email: string
  nickname: string
  role: string
	create_time: Date
}

export interface UserCreateParams {
  avatar_url?: string
  username?: string
  password?: string
  email?: string
  nickname?: string
  role?: string
}
