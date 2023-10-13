import { Injectable } from '@nestjs/common'
import { UserService } from '@/user/user.service'
import { UserLoginDto } from '@/user/user.dto'
import { CustomException } from '@/common/exceptions/custom.business'
import * as crypto from 'crypto'
import { JwtService } from '@nestjs/jwt'

const md5 = (s: string) => {
  return crypto.createHash('md5').update(s).digest('hex')
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(userLogin: UserLoginDto): Promise<any> {
    const user = await this.userService.findOne(userLogin.username)
    if (user) {
      const { password, ...result } = user
      if (password !== md5(userLogin.password)) {
        throw new CustomException('用户密码错误！')
      }
      return result
    }
    return null
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
