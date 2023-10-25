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
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname, join } from 'path'

@Module({
  imports: [
    JwtModule.register({
      secret: 'liwenkai',
      signOptions: {
        expiresIn: '7d'
      }
    }),
    PassportModule,
    MulterModule.register({
      // 用于配置上传，这部分也可以写在路由上
      storage: diskStorage({
        // destination: join(__dirname, '../images'),
        destination: join('./public/uploaded'),
        filename: (_, file, callback) => {
          const fileName = `${new Date().getTime() + extname(file.originalname)}`
          return callback(null, fileName)
        }
      })
    })
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
