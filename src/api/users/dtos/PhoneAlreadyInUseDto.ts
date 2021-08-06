import { HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { DomainErrorCode } from '../../../shared/domain/errors/DomainErrorCode'
import { domainErrorToHttpStatusCode } from '../../../shared/infrastructure/errors/domainErrorToHttpStatusCode'

const domainErrorCode = DomainErrorCode.USER_PHONE_IN_USE

export class PhoneAlreadyInUseDto {
  @ApiProperty({ enum: DomainErrorCode, example: domainErrorCode })
  error?: DomainErrorCode

  @ApiProperty({
    type: String,
    example: 'The phone provided is being used by another user',
  })
  message!: string

  @ApiProperty({ enum: HttpStatus, example: domainErrorToHttpStatusCode[domainErrorCode] })
  statusCode!: HttpStatus
}
