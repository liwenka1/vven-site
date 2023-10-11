declare const module: any

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { generateDocmment } from './doc'
import { logger } from './common/middleware/logger.middleware'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 文档支持
  generateDocmment(app)

  // 日志
  app.use(logger)

  // 允许跨域访问的配置
  app.enableCors()

  await app.listen(4000)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap()
