import { HttpStatus } from '@nestjs/common'
import { DomainErrorCode } from '../../domain/errors/DomainErrorCode'

export const domainErrorToHttpStatusCode: Record<DomainErrorCode, number> = {
  [DomainErrorCode.AGGREGATE_ALREADY_CREATED_ERROR]: HttpStatus.CONFLICT,
  [DomainErrorCode.INVALID_DATE_RANGE]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.SPEAKER_DOES_NOT_EXISTS]: HttpStatus.NOT_FOUND,
  [DomainErrorCode.UNDERAGE_SPEAKER]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.TALK_DOES_NOT_EXISTS]: HttpStatus.NOT_FOUND,
  [DomainErrorCode.TALK_DESCRIPTION_TOO_LONG]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.TALK_TITLE_TOO_LONG]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.MAXIMUM_COSPEAKERS_REACHED]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.TALK_ALREADY_BEING_REVIEWED]: HttpStatus.BAD_REQUEST,
}
