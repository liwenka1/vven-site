import { Body, Controller, Get, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { UserService } from './user.service'
import {
  UserCreateOrUpdateFilters,
  UserRegisterParams,
  UserResetParams,
  UserSearchFilters,
  UserWithoutPassword
} from './user.dto'
import { AuthGuard } from '@nestjs/passport'
import { Public } from '@/common/metadata/public.metadata'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('local'))
  @Public()
  @Post('login')
  login(@Request() req): Promise<string> {
    return this.userService.login(req.user)
  }

  @Get('profile')
  profile(@Request() req) {
    return req.user
  }

  @Public()
  @Post('register')
  register(@Body() params: UserRegisterParams): Promise<void> {
    return this.userService.register(params)
  }

  @Public()
  @Post('reset')
  reset(@Body() params: UserResetParams): Promise<void> {
    return this.userService.reset(params)
  }

  @Post('search')
  search(@Body() params: UserSearchFilters & { orderBy?: 'asc' | 'desc' }): Promise<UserWithoutPassword[]> {
    return this.userService.findMany(params)
  }

  @Post('create')
  create(@Body() params: UserCreateOrUpdateFilters): Promise<void> {
    return this.userService.create(params)
  }

  @Post('delete')
  delete(@Body() params: { id: number }): Promise<void> {
    return this.userService.delete(params)
  }

  @Post('update')
  update(@Body() params: UserCreateOrUpdateFilters & { id: number }): Promise<void> {
    return this.userService.update(params)
  }

  @Public()
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  upload(@UploadedFile() file: Express.Multer.File) {
    return file.filename
  }
}
