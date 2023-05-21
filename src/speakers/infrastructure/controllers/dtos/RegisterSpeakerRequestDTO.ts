import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUUID } from 'class-validator'
import { CONCHA_ASENSIO } from '../../../../shared/infrastructure/fixtures/speakers'

export class RegisterSpeakerRequestDTO {
  @ApiProperty({ example: CONCHA_ASENSIO.id })
  @IsUUID()
  id!: string

  @ApiProperty({ example: CONCHA_ASENSIO.email })
  @IsString()
  email!: string

  @ApiProperty({ example: CONCHA_ASENSIO.password })
  @IsString()
  password!: string
}
