import { Body, Controller, Get, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { UserService } from './user.service'
import {
  UserCreateOrUpdateFilters,
  UserDeleteFilters,
  UserRegisterParams,
  UserResetParams,
  UserSearchData,
  UserSearchFilters
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
  search(@Body() params: UserSearchFilters): Promise<UserSearchData> {
    return this.userService.findMany(params)
  }

  @Post('create')
  create(@Body() params: UserCreateOrUpdateFilters): Promise<void> {
    return this.userService.create(params)
  }

  @Post('update')
  update(@Body() params: UserCreateOrUpdateFilters & { id: number }): Promise<void> {
    return this.userService.update(params)
  }

  @Post('delete')
  delete(@Body() params: UserDeleteFilters): Promise<void> {
    return this.userService.delete(params)
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  upload(@UploadedFile() file: Express.Multer.File, @Body('id') id?: string): Promise<string> {
    return this.userService.upload(file, id)
  }
}
