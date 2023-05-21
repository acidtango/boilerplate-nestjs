import { Role } from '../../shared/domain/models/Role'

export type JwtPayload = {
  sub: string
  iat: number
  exp: number
  role: Role
}
