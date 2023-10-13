import { CustomException } from '@/common/exceptions/custom.business'
import { IS_PUBLIC_KEY } from '@/common/metadata/public.metadata'
import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  ) {
    super()
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['x-token']?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if (isPublic) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new CustomException('无token！')
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'liwenkai'
      })
      request['user'] = payload
    } catch {
      throw new CustomException('token错误！')
    }
    return true
  }
}
