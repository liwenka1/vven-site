import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { PrismaService } from 'src/prisma/prisma.service'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    JwtModule.register({
      secret: 'liwenkai',
      signOptions: {
        expiresIn: '7d'
      }
    })
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService]
})
export class UserModule {}
