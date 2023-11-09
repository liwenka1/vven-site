import { Article } from '@prisma/client'
import { Tag } from '@prisma/client'
import { ArticleTag } from '@prisma/client'

interface OrderBy {
  orderBy: {
    updateTime?: 'asc' | 'desc'
    createTime?: 'asc' | 'desc'
  }
}

interface Tags {
  tags: string[]
}

export type ArticleSearchFilters = Partial<Article & OrderBy>

export type ArticleCreateOrUpdateFilters = Partial<Omit<Article, 'id' | 'createTime'>>

export type ArticleDeleteFilters = Pick<Article, 'id'>

export type TagSearchFilters = Partial<Tag>

export type TagCreateOrUpdateFilters = Partial<Omit<Tag, 'id'>>

export type TagDeleteFilters = Pick<Tag, 'id'>

export type ArticleTagSearchFilters = Partial<ArticleTag>

export type ArticleTagCreateOrUpdateFilters = Omit<ArticleTag, 'id'>

export type ArticleWithTag = Article & Tags

export type ArticleSearchFiltersWithTag = ArticleSearchFilters & Partial<Tags>

export type ArticleCreateOrUpdateFiltersWithTag = ArticleCreateOrUpdateFilters & Partial<Tags>
