import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { UserFilters, UserWithoutPassword } from './user.dto'
import { AuthGuard } from '@nestjs/passport'
import { Public } from '@/common/metadata/public.metadata'

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
  register(@Body() filters: UserFilters): Promise<void> {
    return this.userService.register(filters)
  }

  @Public()
  @Post('reset')
  reset(@Body() filters: UserFilters): Promise<void> {
    return this.userService.reset(filters)
  }

  @Post('select')
  select(@Body() filters: UserFilters): Promise<UserWithoutPassword[]> {
    return this.userService.findMany(filters)
  }

  @Post('create')
  create(@Body() filters: UserFilters): Promise<void> {
    return this.userService.create(filters)
  }

  @Post('delete')
  delete(@Body() filters: UserFilters & { id: number }): Promise<void> {
    return this.userService.delete(filters)
  }

  @Post('update')
  update(@Body() filters: UserFilters & { id: number }): Promise<void> {
    return this.userService.update(filters)
  }
}
