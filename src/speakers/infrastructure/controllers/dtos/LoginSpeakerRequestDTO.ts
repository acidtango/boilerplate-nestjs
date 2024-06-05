import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { PAOLA } from '../../../../shared/infrastructure/fixtures/speakers'

export class LoginSpeakerRequestDTO {
  @ApiProperty({ example: PAOLA.email })
  @IsString()
  email!: string

  @ApiProperty({ example: PAOLA.password })
  @IsString()
  password!: string
}
