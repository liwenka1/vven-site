export interface Article {
  id: number
  title: string
  content: string
  author: string
  isDraft: boolean
  updateTime: Date
  createTime: Date
}

export interface Tag {
  id: number
  name: string
  articleId: number
}

export type ArticleSearchFilters = Partial<Article>
