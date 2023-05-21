import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { CONCHA_ASENSIO } from '../../../../shared/infrastructure/fixtures/speakers'

export class LoginSpeakerRequestDTO {
  @ApiProperty({ example: CONCHA_ASENSIO.email })
  @IsString()
  email!: string

  @ApiProperty({ example: CONCHA_ASENSIO.password })
  @IsString()
  password!: string
}
