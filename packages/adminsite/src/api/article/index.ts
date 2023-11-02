import { http } from '@/utils/request'
import { Article, ArticleSearchFilters, ArticleCreateOrUpdateFilters, ArticleDeleteFilters } from './type'
import { ResponseData } from '@/type'

export const articleApi = {
  search: (params: ArticleSearchFilters) => {
    return http.post<ResponseData<Article[]>>('/article/articleSearch', params)
  },
  create: (params: ArticleCreateOrUpdateFilters) => {
    return http.post<ResponseData<void>>('article/articleCreate', params)
  },
  update: (params: ArticleCreateOrUpdateFilters & { id: number }) => {
    return http.post<ResponseData<void>>('article/articleUpdate', params)
  },
  delete: (params: ArticleDeleteFilters) => {
    return http.post<ResponseData<void>>('article/articleDelete', params)
  }
}
