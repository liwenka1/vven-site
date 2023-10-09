import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { PrismaService } from './prisma/prisma.service'
import { CustomException } from './common/exceptions/custom.business'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('/prisma')
  async getPrisma() {
    return await this.prisma.user.findMany()
  }

  @Get('err')
  getErr() {
    throw new CustomException('自定义异常抛出111')
  }
}
