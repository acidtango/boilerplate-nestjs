import { HttpStatus } from '@nestjs/common'
import { DomainErrorCode } from '../../domain/errors/DomainErrorCode'

export const domainErrorToHttpStatusCode: Record<DomainErrorCode, number> = {
  [DomainErrorCode.CONTACT_NOT_REGISTERED]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.INVALID_PHONE_NUMBER]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.USER_NOT_FOUND_ERROR]: HttpStatus.NOT_FOUND,
  [DomainErrorCode.USER_PHONE_IN_USE]: HttpStatus.CONFLICT,
}
