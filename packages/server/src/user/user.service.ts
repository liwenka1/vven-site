import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { UserRegisterDto, UserLoginDto, UserResetDto } from './user.dto'
import * as crypto from 'crypto'
import { JwtService } from '@nestjs/jwt'
import { CustomException } from '@/common/exceptions/custom.business'
import { User } from '@prisma/client'
import { Role } from '@/common/enums/role.enum'

const md5 = (s: string) => {
  return crypto.createHash('md5').update(s).digest('hex')
}

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService
  ) {}

  findOne(username: string): Promise<User | undefined> {
    return this.prisma.user.findFirst({
      where: {
        username: username
      }
    })
  }

  async login(userLogin: UserLoginDto): Promise<string> {
    const token = this.jwt.sign(userLogin)
    return token
  }

  async isFirstUser(): Promise<boolean> {
    const count = await this.prisma.user.count()
    return count === 0
  }

  async register(userRegister: UserRegisterDto): Promise<boolean> {
    const isFirst = await this.isFirstUser()
    if (isFirst) {
      await this.prisma.user.create({
        data: {
          username: userRegister.username,
          password: md5(userRegister.password),
          nickname: userRegister.nickname,
          email: userRegister.email,
          role: Role.Admin
        }
      })
      return true
    }
    const first = await this.findOne(userRegister.username)
    if (first) {
      throw new CustomException('用户已存在！')
    } else {
      await this.prisma.user.create({
        data: {
          username: userRegister.username,
          password: md5(userRegister.password),
          nickname: userRegister.nickname,
          email: userRegister.email,
          role: Role.User
        }
      })
      return true
    }
  }

  async reset(userResetDto: UserResetDto): Promise<boolean> {
    const first = await this.findOne(userResetDto.username)
    if (!first) {
      throw new CustomException('用户不存在！')
    } else if (first.email !== userResetDto.email) {
      throw new CustomException('邮箱错误！')
    } else {
      await this.prisma.user.update({
        where: {
          id: first.id
        },
        data: {
          username: userResetDto.username,
          password: md5(userResetDto.password),
          email: userResetDto.email
        }
      })
      return true
    }
  }
}
