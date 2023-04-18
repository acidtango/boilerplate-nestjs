import { HttpStatus } from '@nestjs/common'
import { DomainErrorCode } from '../../domain/errors/DomainErrorCode'

export const domainErrorToHttpStatusCode: Record<DomainErrorCode, number> = {
  [DomainErrorCode.AGGREGATE_ALREADY_CREATED_ERROR]: HttpStatus.CONFLICT,
  [DomainErrorCode.INVALID_DATE_RANGE]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.SPEAKER_DOES_NOT_EXISTS]: HttpStatus.NOT_FOUND,
  [DomainErrorCode.UNDERAGE_SPEAKER]: HttpStatus.BAD_REQUEST,
}
