import { Article } from '@prisma/client'
import { Tag } from '@prisma/client'

export type ArticleSearchFilters = Partial<Article>

export type ArticleCreateOrUpdateFilters = Partial<Omit<Article, 'id' | 'createTime'>>

export type ArticleDeleteFilters = Pick<Article, 'id'>

export type TagSearchFilters = Partial<Tag>

export type TagCreateOrUpdateFilters = Partial<Omit<Tag, 'id'>>

export type TagDeleteFilters = Pick<Tag, 'id'>
