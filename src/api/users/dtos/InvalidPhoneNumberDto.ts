import { HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { DomainErrorCode } from '../../../shared/domain/errors/DomainErrorCode'
import { domainErrorToHttpStatusCode } from '../../../shared/infrastructure/errors/domainErrorToHttpStatusCode'

const domainErrorCode = DomainErrorCode.INVALID_PHONE_NUMBER

export class InvalidPhoneNumberDto {
  @ApiProperty({ enum: DomainErrorCode, example: domainErrorCode })
  error?: DomainErrorCode

  @ApiProperty({
    type: String,
    example: "The string '(600) 123 456' is not a well formatted E.164 phone number",
  })
  message!: string

  @ApiProperty({ enum: HttpStatus, example: domainErrorToHttpStatusCode[domainErrorCode] })
  statusCode!: HttpStatus
}
