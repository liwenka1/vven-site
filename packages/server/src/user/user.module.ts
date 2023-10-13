import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { PrismaService } from 'src/prisma/prisma.service'
import { JwtModule } from '@nestjs/jwt'
import { LocalStrategy } from '@/common/strategy/local.strategy'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from '@/auth/auth.service'
import { JwtStrategy } from '@/common/strategy/jwt.strategy'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { APP_GUARD } from '@nestjs/core'

@Module({
  imports: [
    JwtModule.register({
      secret: 'liwenkai',
      signOptions: {
        expiresIn: '7d'
      }
    }),
    PassportModule
  ],
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class UserModule {}
