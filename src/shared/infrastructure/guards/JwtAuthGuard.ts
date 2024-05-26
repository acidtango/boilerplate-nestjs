import * as jwt from 'jsonwebtoken'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtPayload } from '../../../auth/domain/JwtPayload'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    if (!roles) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    const bearer = request.headers.authorization
    const token = bearer.split(' ')[1]

    try {
      const payload = jwt.verify(token, 'ilovecats', {
        ignoreExpiration: true,
      }) as JwtPayload

      return roles.includes(payload.role)
    } catch (e) {
      console.error(e)
      return false
    }
  }
}
