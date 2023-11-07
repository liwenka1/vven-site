import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import {
  ArticleCreateOrUpdateFilters,
  ArticleDeleteFilters,
  ArticleSearchFilters,
  TagCreateOrUpdateFilters,
  TagDeleteFilters,
  TagSearchFilters,
  ArticleTagSearchFilters,
  ArticleTagCreateOrUpdateFilters,
  ArticleWithTag,
  ArticleCreateOrUpdateFiltersWithTag
} from './article.dto'
import { Article, ArticleTag, Tag } from '@prisma/client'

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) {}

  findFirstArticle(filters: ArticleSearchFilters): Promise<Article | null> {
    return this.prisma.article.findFirst({
      where: filters
    })
  }

  findManyArticle(filters: ArticleSearchFilters): Promise<Article[]> {
    const { orderBy, ...where } = filters
    return this.prisma.article.findMany({
      where: where,
      orderBy: orderBy
    })
  }

  async createArticle(filters: ArticleCreateOrUpdateFilters): Promise<Article> {
    const article: Article = await this.prisma.article.create({
      data: filters
    })
    return article
  }

  async updateArticle(filters: ArticleCreateOrUpdateFilters & { id: number }): Promise<void> {
    const { id, ...data } = filters
    await this.prisma.article.update({
      where: {
        id: id
      },
      data: data
    })
  }

  async deleteArticle(filters: ArticleDeleteFilters): Promise<void> {
    await this.prisma.article.delete({
      where: filters
    })
  }

  findFirstTag(filters: TagSearchFilters): Promise<Tag | null> {
    return this.prisma.tag.findFirst({
      where: filters
    })
  }

  async findManyTag(filters: TagSearchFilters): Promise<Tag[]> {
    const tags = await this.prisma.tag.findMany({
      where: filters
    })
    return tags
  }

  async createTag(filters: TagCreateOrUpdateFilters): Promise<Tag> {
    const tag = await this.prisma.tag.create({
      data: filters
    })
    return tag
  }

  async updateTag(filters: TagCreateOrUpdateFilters & { id: number }): Promise<void> {
    const { id, ...data } = filters
    await this.prisma.tag.update({
      where: {
        id: id
      },
      data: data
    })
  }

  async deleteTag(filters: TagDeleteFilters): Promise<void> {
    await this.prisma.tag.delete({
      where: filters
    })
  }

  findFirstArticleTag(filters: ArticleTagSearchFilters): Promise<ArticleTag | null> {
    return this.prisma.articleTag.findFirst({
      where: filters
    })
  }

  findManyArticleTag(filters: ArticleTagSearchFilters): Promise<ArticleTag[]> {
    return this.prisma.articleTag.findMany({
      where: filters
    })
  }

  async createArticleTag(filters: ArticleTagCreateOrUpdateFilters): Promise<void> {
    await this.prisma.articleTag.create({
      data: filters
    })
  }

  async updateArticleTag(filters: ArticleTagCreateOrUpdateFilters & { id: number }): Promise<void> {
    const { id, ...data } = filters
    await this.prisma.articleTag.update({
      where: {
        id: id
      },
      data: data
    })
  }

  async deleteManyArticleTag(filters: ArticleTagSearchFilters): Promise<void> {
    await this.prisma.articleTag.deleteMany({
      where: filters
    })
  }

  async articleSearch(params: ArticleSearchFilters): Promise<ArticleWithTag[]> {
    const articles = await this.findManyArticle(params)
    const articleWithTags: ArticleWithTag[] = []
    for (const article of articles) {
      const tags: Tag[] = []
      const articleTags = await this.findManyArticleTag({ articleId: article.id })
      for (const articleTag of articleTags) {
        const tag = await this.findFirstTag({ id: articleTag.tagId })
        tags.push(tag)
      }
      const articleWithTag: ArticleWithTag = {
        ...article,
        tags
      }
      articleWithTags.push(articleWithTag)
    }
    return articleWithTags
  }

  async createOrUpdateTags(tags: TagSearchFilters[], articleId: number): Promise<void> {
    for (const tag of tags) {
      let tagId: number
      if (!tag.id) {
        const { id } = await this.createTag({ name: tag.name })
        tagId = id
      } else {
        tagId = tag.id
      }
      await this.createArticleTag({ tagId, articleId })
    }
  }

  async articleCreate(params: ArticleCreateOrUpdateFiltersWithTag): Promise<void> {
    const { tags, ...data } = params
    const article = await this.createArticle(data)
    await this.createOrUpdateTags(tags, article.id)
  }

  async articleUpdate(params: ArticleCreateOrUpdateFiltersWithTag & { id: number }): Promise<void> {
    const { tags, ...data } = params
    await this.updateArticle(data)
    if (tags.length) {
      await this.findManyArticleTag({ articleId: data.id })
      await this.deleteManyArticleTag({ articleId: data.id })
      await this.createOrUpdateTags(tags, data.id)
    }
  }

  async articleDelete(params: ArticleDeleteFilters): Promise<void> {
    await this.deleteManyArticleTag({ articleId: params.id })
    await this.deleteArticle(params)
  }
}
