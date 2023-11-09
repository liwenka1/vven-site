import { http } from '@/utils/request'
import {
  ArticleWithTag,
  ArticleDeleteFilters,
  Tag,
  TagSearchFilters,
  ArticleSearchFiltersWithTag,
  ArticleCreateOrUpdateFiltersWithTag
} from './type'
import { ResponseData } from '@/type'

export const articleApi = {
  search: (params?: ArticleSearchFiltersWithTag) => {
    return http.post<ResponseData<ArticleWithTag[]>>('/article/articleSearch', params)
  },
  create: (params: ArticleCreateOrUpdateFiltersWithTag) => {
    return http.post<ResponseData<void>>('article/articleCreate', params)
  },
  update: (params: ArticleCreateOrUpdateFiltersWithTag & { id: number }) => {
    return http.post<ResponseData<void>>('article/articleUpdate', params)
  },
  delete: (params: ArticleDeleteFilters) => {
    return http.post<ResponseData<void>>('article/articleDelete', params)
  }
}

export const tagApi = {
  search: (params?: TagSearchFilters) => {
    return http.post<ResponseData<Tag[]>>('/article/tagSearch', params)
  }
}
