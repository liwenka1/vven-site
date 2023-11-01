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
  ArticleTagDeleteFilters
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
    return this.prisma.article.findMany({
      where: filters
    })
  }

  async createArticle(filters: ArticleCreateOrUpdateFilters): Promise<void> {
    await this.prisma.article.create({
      data: filters
    })
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

  findManyTag(filters: TagSearchFilters): Promise<Tag[]> {
    return this.prisma.tag.findMany({
      where: filters
    })
  }

  async createTag(filters: TagCreateOrUpdateFilters): Promise<void> {
    await this.prisma.tag.create({
      data: filters
    })
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

  async deleteArticleTag(filters: ArticleTagDeleteFilters): Promise<void> {
    await this.prisma.articleTag.delete({
      where: filters
    })
  }
}
