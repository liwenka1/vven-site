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
