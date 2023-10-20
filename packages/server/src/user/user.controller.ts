import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { UserCreateDto, UserFilters, UserInfoDto, UserRegisterDto, UserResetDto } from './user.dto'
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
  register(@Body() userRegister: UserRegisterDto): Promise<void> {
    return this.userService.register(userRegister)
  }

  @Public()
  @Post('reset')
  reset(@Body() userResetDto: UserResetDto): Promise<void> {
    return this.userService.reset(userResetDto)
  }

  @Post('select')
  select(@Body() filters: UserFilters): Promise<UserInfoDto[] | null> {
    return this.userService.findMany(filters)
  }

  @Post('create')
  create(@Body() userCreateDto: UserCreateDto): Promise<void> {
    return this.userService.create(userCreateDto)
  }
}
