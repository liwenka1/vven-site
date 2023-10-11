import { Body, Controller, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { UserLoginDto, UserRegisterDto } from './user.dto'
import { User } from '@prisma/client'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() userRegister: UserRegisterDto): Promise<boolean> {
    return this.userService.register(userRegister)
  }

  @Post('login')
  login(@Body() userLogin: UserLoginDto): Promise<User & { token: string }> {
    return this.userService.login(userLogin)
  }
}
