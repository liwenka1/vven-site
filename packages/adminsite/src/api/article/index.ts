import { http } from '@/utils/request'
import { ArticleSearchFilters } from './type'

export const article = {
  search: (params: ArticleSearchFilters) => {
    return http.post('/article/articleSearch', params)
  }
}
