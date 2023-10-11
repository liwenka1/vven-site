export interface RegisterParams {
  username: string
  password: string
  nickname: string
  email: string
}

export interface LoginParams {
  username: string
  password: string
}

export interface ResetParams {
  username: string
  password: string
  email: string
}
