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
  avatar_url: string
  username: string
  email: string
  nickname: string
  role: string
  token: string
}
