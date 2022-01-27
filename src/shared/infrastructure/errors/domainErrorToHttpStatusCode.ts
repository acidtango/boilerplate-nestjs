import { HttpStatus } from '@nestjs/common'
import { DomainErrorCode } from '../../domain/errors/DomainErrorCode'

export const domainErrorToHttpStatusCode: Record<DomainErrorCode, number> = {
  [DomainErrorCode.INVALID_PHONE_NUMBER]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.USER_PHONE_IN_USE]: HttpStatus.CONFLICT,
}
