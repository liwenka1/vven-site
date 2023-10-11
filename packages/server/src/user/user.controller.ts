import { Body, Controller, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { UserInfoDto, UserLoginDto, UserRegisterDto } from './user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() userRegister: UserRegisterDto): Promise<boolean> {
    return this.userService.register(userRegister)
  }

  @Post('login')
  login(@Body() userLogin: UserLoginDto): Promise<UserInfoDto> {
    return this.userService.login(userLogin)
  }
}
