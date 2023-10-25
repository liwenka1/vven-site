import { Injectable } from '@nestjs/common'
import { UserService } from '@/user/user.service'
import { UserLoginParams, UserWithoutPassword } from '@/user/user.dto'
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

  async validateUser(filters: UserLoginParams): Promise<UserWithoutPassword | null> {
    const user = await this.userService.findFirst({ username: filters.username })
    if (user) {
      const { password, ...result } = user
      if (password !== md5(filters.password)) {
        throw new CustomException('用户密码错误！')
      }
      return result
    }
    return null
  }

  async login(user: UserWithoutPassword) {
    const payload = { username: user.username, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
