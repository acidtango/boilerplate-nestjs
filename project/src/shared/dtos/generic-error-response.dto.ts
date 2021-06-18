import { HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import DomainErrorCode from '../domain/errors/domain-error-code.domain'

export default class GenericErrorResponseDto {
  @ApiProperty({
    enum: HttpStatus,
    description: 'The same http status error code that the response',
  })
  statusCode!: HttpStatus

  @ApiProperty({
    type: String,
    example: 'A descriptive message of the problem',
  })
  message!: string

  @ApiProperty({
    enum: DomainErrorCode,
    description: 'Custom error code that identifies the problem',
  })
  error?: DomainErrorCode
}
