import { Body, Controller, Post } from '@nestjs/common'
import { ArticleService } from './article.service'
import {
  ArticleCreateOrUpdateFiltersWithTag,
  ArticleDeleteFilters,
  ArticleSearchFiltersWithTag,
  ArticleWithTag,
  TagSearchFilters
} from './article.dto'
import { Tag } from '@prisma/client'

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('articleSearch')
  articleSearch(@Body() params: ArticleSearchFiltersWithTag): Promise<ArticleWithTag[]> {
    return this.articleService.articleSearch(params)
  }

  @Post('articleCreate')
  articleCreate(@Body() params: ArticleCreateOrUpdateFiltersWithTag): Promise<void> {
    return this.articleService.articleCreate(params)
  }

  @Post('articleUpdate')
  articleUpdate(@Body() params: ArticleCreateOrUpdateFiltersWithTag & { id: number }): Promise<void> {
    return this.articleService.articleUpdate(params)
  }

  @Post('articleDelete')
  articleDelete(@Body() params: ArticleDeleteFilters): Promise<void> {
    return this.articleService.articleDelete(params)
  }

  @Post('tagSearch')
  tagSearch(@Body() params: TagSearchFilters): Promise<Tag[]> {
    return this.articleService.findManyTag(params)
  }
}
