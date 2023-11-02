import { Body, Controller, Post } from '@nestjs/common'
import { ArticleService } from './article.service'
import { UserSearchFilters } from '@/user/user.dto'
import { Article } from '@prisma/client'

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('articleSearch')
  articleSearch(@Body() params: UserSearchFilters): Promise<Article[]> {
    return this.articleService.findManyArticle(params)
  }
}
