import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import {
  UserCreateOrUpdateFilters,
  UserDeleteFilters,
  UserLoginParams,
  UserRegisterParams,
  UserResetParams,
  UserSearchFilters,
  UserWithoutPassword
} from './user.dto'
import * as crypto from 'crypto'
import { JwtService } from '@nestjs/jwt'
import { CustomException } from '@/common/exceptions/custom.business'
import { User } from '@prisma/client'

const md5 = (s: string) => {
  return crypto.createHash('md5').update(s).digest('hex')
}

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService
  ) {}

  findFirst(filters: UserSearchFilters): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: filters
    })
  }

  async findMany(filters: UserSearchFilters & { orderBy?: 'asc' | 'desc' }): Promise<UserWithoutPassword[]> {
    const { orderBy, ...where } = filters
    const users = await this.prisma.user.findMany({
      where: where,
      select: {
        id: true,
        avatarUrl: true,
        username: true,
        email: true,
        nickname: true,
        role: true,
        createTime: true
      },
      orderBy: {
        createTime: orderBy
      }
    })
    if (orderBy) {
      return users
    } else {
      return users.sort((a, b) => (a.role === 'admin' ? -1 : b.role === 'admin' ? 1 : 0))
    }
  }

  async create(filters: UserCreateOrUpdateFilters): Promise<void> {
    const first = await this.findFirst({ username: filters.username })
    if (first) {
      throw new CustomException('用户已存在！')
    } else {
      filters.password = md5(filters.password)
      await this.prisma.user.create({
        data: filters
      })
    }
  }

  async update(filters: UserCreateOrUpdateFilters & { id: number }): Promise<void> {
    if (filters.password) {
      filters.password = md5(filters.password)
    }
    const { id, ...data } = filters
    await this.prisma.user.update({
      where: {
        id: id
      },
      data: data
    })
  }

  async delete(filters: UserDeleteFilters): Promise<void> {
    await this.prisma.user.delete({
      where: filters
    })
  }

  async login(params: UserLoginParams): Promise<string> {
    const token = this.jwt.sign(params)
    return token
  }

  async isFirstUser(): Promise<boolean> {
    const count = await this.prisma.user.count()
    return count === 0
  }

  async register(params: UserRegisterParams): Promise<void> {
    const isFirst = await this.isFirstUser()
    if (isFirst) {
      await this.create({
        ...params,
        role: 'admin'
      })
    } else {
      await this.create({
        ...params,
        role: 'user'
      })
    }
  }

  async reset(params: UserResetParams): Promise<void> {
    const first = await this.findFirst({ username: params.username })
    if (!first) {
      throw new CustomException('用户不存在！')
    } else if (first.email !== params.email) {
      throw new CustomException('邮箱错误！')
    } else {
      params.password = md5(params.password)
      await this.update({ id: first.id, ...params })
    }
  }

  async upload(file: Express.Multer.File, id?: string): Promise<string> {
    const avatarUrl = process.env.UPLOADURL + `/static/${file.filename}`
    if (id) {
      this.update({ id: Number(id), avatarUrl: avatarUrl })
    }
    return avatarUrl
  }
}
