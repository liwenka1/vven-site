export interface UserRegisterDto {
  username: string
  password: string
  nickname: string
  email: string
}

export interface UserLoginDto {
  username: string
  password: string
}

export interface UserInfoDto {
  id: number
  avatar_url: string
  username: string
  email: string
  nickname: string
  role: string
  create_time: Date
}

export interface UserResetDto {
  username: string
  password: string
  email: string
}

export interface UserFilters {
  username?: string
  password?: string
  nickname?: string
  email?: string
  role?: string
}

export interface UserCreateDto {
  avatar_url?: string
  username?: string
  password?: string
  email?: string
  nickname?: string
  role?: string
}
