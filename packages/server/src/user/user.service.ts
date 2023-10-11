import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserRegisterDto, UserLoginDto, UserInfoDto } from './user.dto'
import * as crypto from 'crypto'
import { JwtService } from '@nestjs/jwt'
import { CustomException } from 'src/common/exceptions/custom.business'

const md5 = (s: string) => {
  return crypto.createHash('md5').update(s).digest('hex')
}

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService
  ) {}

  async register(userRegister: UserRegisterDto): Promise<boolean> {
    const first = await this.prisma.user.findFirst({
      where: {
        username: userRegister.username
      }
    })
    if (first) {
      throw new CustomException('用户已存在！')
    } else {
      await this.prisma.user.create({
        data: {
          username: userRegister.username,
          password: md5(userRegister.password),
          nickname: userRegister.nickname,
          email: userRegister.email
        }
      })
      return true
    }
  }

  async login(userLogin: UserLoginDto): Promise<UserInfoDto> {
    const first = await this.prisma.user.findFirst({
      where: {
        username: userLogin.username
      }
    })
    if (!first) {
      throw new CustomException('用户不存在！')
    } else if (first.password !== md5(userLogin.password)) {
      throw new CustomException('用户密码错误！')
    } else {
      const token = this.jwt.sign(userLogin)
      return {
        avatar_url: first.avatar_url,
        username: first.username,
        email: first.email,
        nickname: first.nickname,
        role: first.role,
        token: token
      }
    }
  }
}
