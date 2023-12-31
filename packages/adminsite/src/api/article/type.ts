export interface Article {
  id: number
  title: string
  content: string
  author: string
  description: string
  isDraft: boolean
  isFeatured: boolean
  updateTime: Date
  createTime: Date
}

export interface Tag {
  id: number
  name: string
}

export interface ArticleTag {
  id: number
  articleId: number
  tagId: number
}

interface OrderBy {
  orderBy: {
    updateTime?: 'asc' | 'desc'
    createTime?: 'asc' | 'desc'
  }
}

interface Tags {
  tags: string[]
}

type ArticleSearchFilters = Partial<Article & OrderBy>

type ArticleCreateOrUpdateFilters = Partial<Omit<Article, 'id' | 'createTime' | 'updateTime'>>

export type ArticleDeleteFilters = Pick<Article, 'id'>

export type TagSearchFilters = Partial<Tag>

export type ArticleWithTag = Article & Tags

export type ArticleSearchFiltersWithTag = ArticleSearchFilters & Partial<Tags>

export type ArticleCreateOrUpdateFiltersWithTag = ArticleCreateOrUpdateFilters & Partial<Tags>
