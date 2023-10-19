import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { UserRegisterDto, UserLoginDto, UserResetDto, UserFilters, UserInfoDto, UserCreateDto } from './user.dto'
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

  findFirst(username: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        username: username
      }
    })
  }

  async findMany(filters: UserFilters): Promise<UserInfoDto[] | null> {
    const users = await this.prisma.user.findMany({
      where: filters,
      select: {
        avatar_url: true,
        username: true,
        email: true,
        nickname: true,
        role: true,
        create_time: true
      }
    })
    return users
  }

  async create(userCreateDto: UserCreateDto): Promise<void> {
    userCreateDto.password = md5(userCreateDto.password)
    await this.prisma.user.create({
      data: userCreateDto
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

  async register(userRegister: UserRegisterDto): Promise<void> {
    const isFirst = await this.isFirstUser()
    if (isFirst) {
      await this.create({
        username: userRegister.username,
        password: md5(userRegister.password),
        nickname: userRegister.nickname,
        email: userRegister.email,
        role: Role.Admin
      })
    }
    const first = await this.findFirst(userRegister.username)
    if (first) {
      throw new CustomException('用户已存在！')
    } else {
      await this.create({
        username: userRegister.username,
        password: md5(userRegister.password),
        nickname: userRegister.nickname,
        email: userRegister.email,
        role: Role.User
      })
    }
  }

  async reset(userResetDto: UserResetDto): Promise<void> {
    const first = await this.findFirst(userResetDto.username)
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
    }
  }
}
