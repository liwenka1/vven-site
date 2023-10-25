import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { BaseExceptionFilter } from './common/exceptions/base.exception.filter'
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter'
import { UserModule } from './user/user.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
  imports: [
    UserModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public/uploaded'),
      serveRoot: '/static'
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
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
