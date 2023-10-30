import { http } from '@/utils/request'

export const article = {
  articleSearch: (params: unknown) => {
    return http.post('/article/search', params)
  }
}
