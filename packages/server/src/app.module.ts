import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaService } from './prisma/prisma.service'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { BaseExceptionFilter } from './common/exceptions/base.exception.filter'
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter'
import { UserModule } from './user/user.module'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'liwenkai',
      signOptions: {
        expiresIn: '7d'
      }
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      // 全局拦截器
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor
    },
    {
      // 全部异常拦截
      provide: APP_FILTER,
      useClass: BaseExceptionFilter
    },
    {
      // Http异常
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ]
})
export class AppModule {}
