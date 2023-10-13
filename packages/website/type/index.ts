export interface ResponseData<T> {
  data: T
  status: number
  extra: unknown
  message: string
  success: boolean
}
