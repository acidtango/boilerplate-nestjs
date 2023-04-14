import { HttpStatus } from '@nestjs/common'
import { DomainErrorCode } from '../../domain/errors/DomainErrorCode'

export const domainErrorToHttpStatusCode: Record<DomainErrorCode, number> = {
  [DomainErrorCode.ENTITY_ALREADY_CREATED_ERROR]: HttpStatus.CONFLICT,
  [DomainErrorCode.INVALID_DATE_RANGE]: HttpStatus.BAD_REQUEST,
}
