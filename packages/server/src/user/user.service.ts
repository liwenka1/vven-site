import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { UserFilters, UserWithoutPassword } from './user.dto'
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

  findFirst(filters: UserFilters): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: filters
    })
  }

  async findMany(filters: UserFilters & { orderBy?: 'asc' | 'desc' }): Promise<UserWithoutPassword[]> {
    const { orderBy, ...where } = filters
    const users = await this.prisma.user.findMany({
      where: where,
      select: {
        id: true,
        avatar_url: true,
        username: true,
        email: true,
        nickname: true,
        role: true,
        create_time: true
      },
      orderBy: {
        create_time: orderBy
      }
    })
    if (orderBy) {
      return users
    } else {
      return users.sort((a, b) => (a.role === 'admin' ? -1 : b.role === 'admin' ? 1 : 0))
    }
  }

  async create(filters: UserFilters): Promise<void> {
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

  async delete(filters: UserFilters & { id: number }): Promise<void> {
    await this.prisma.user.delete({
      where: filters
    })
  }

  async update(filters: UserFilters & { id: number }): Promise<void> {
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

  async login(filters: UserFilters): Promise<string> {
    const token = this.jwt.sign(filters)
    return token
  }

  async isFirstUser(): Promise<boolean> {
    const count = await this.prisma.user.count()
    return count === 0
  }

  async register(filters: UserFilters): Promise<void> {
    const isFirst = await this.isFirstUser()
    if (isFirst) {
      await this.create({
        ...filters,
        role: 'admin'
      })
    } else {
      await this.create({
        ...filters,
        role: 'user'
      })
    }
  }

  async reset(filters: UserFilters): Promise<void> {
    const first = await this.findFirst({ username: filters.username })
    if (!first) {
      throw new CustomException('用户不存在！')
    } else if (first.email !== filters.email) {
      throw new CustomException('邮箱错误！')
    } else {
      filters.password = md5(filters.password)
      await this.update({ id: first.id, ...filters })
    }
  }
}
