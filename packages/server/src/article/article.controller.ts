import { Body, Controller, Post } from '@nestjs/common'
import { ArticleService } from './article.service'
import { Article } from '@prisma/client'
import { ArticleCreateOrUpdateFilters, ArticleDeleteFilters, ArticleSearchFilters } from './article.dto'

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('articleSearch')
  articleSearch(@Body() params: ArticleSearchFilters): Promise<Article[]> {
    return this.articleService.findManyArticle(params)
  }

  @Post('articleCreate')
  articleCreate(@Body() params: ArticleCreateOrUpdateFilters): Promise<void> {
    return this.articleService.createArticle(params)
  }

  @Post('articleUpdate')
  articleUpdate(@Body() params: ArticleCreateOrUpdateFilters & { id: number }): Promise<void> {
    return this.articleService.updateArticle(params)
  }

  @Post('articleDelete')
  articleDelete(@Body() params: ArticleDeleteFilters): Promise<void> {
    return this.articleService.deleteArticle(params)
  }
}
