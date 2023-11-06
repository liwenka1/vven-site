import { Body, Controller, Post } from '@nestjs/common'
import { ArticleService } from './article.service'
import {
  ArticleCreateOrUpdateFiltersWithTag,
  ArticleDeleteFilters,
  ArticleSearchFilters,
  ArticleWithTag
} from './article.dto'

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('articleSearch')
  articleSearch(@Body() params: ArticleSearchFilters): Promise<ArticleWithTag[]> {
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
}
