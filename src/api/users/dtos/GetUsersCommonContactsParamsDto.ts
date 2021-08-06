import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsUUID } from 'class-validator'
import { UNKNOWN } from '../../../shared/fixtures/users'

export class GetUsersCommonContactsParamsDto {
  @ApiProperty({ example: UNKNOWN.id, required: true })
  @IsDefined()
  @IsUUID(4)
  userId1!: string

  @ApiProperty({ example: UNKNOWN.id, required: true })
  @IsDefined()
  @IsUUID(4)
  userId2!: string
}
