import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { CustomException } from '@/common/exceptions/custom.business'
import { AuthService } from '@/auth/auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super()
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({ username, password })
    if (!user) {
      throw new CustomException('用户不存在！')
    }
    return user
  }
}
