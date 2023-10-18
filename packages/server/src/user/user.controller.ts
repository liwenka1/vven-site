import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { UserFilters, UserInfoDto, UserRegisterDto, UserResetDto } from './user.dto'
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
  getProfile(@Request() req) {
    return req.user
  }

  @Public()
  @Post('register')
  register(@Body() userRegister: UserRegisterDto): Promise<boolean> {
    return this.userService.register(userRegister)
  }

  @Public()
  @Post('reset')
  reset(@Body() userResetDto: UserResetDto): Promise<boolean> {
    return this.userService.reset(userResetDto)
  }

  @Post()
  getUser(@Body() filters: UserFilters): Promise<UserInfoDto[]> {
    return this.userService.findMany(filters)
  }
}
