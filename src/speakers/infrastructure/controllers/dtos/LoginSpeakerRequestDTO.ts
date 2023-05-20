import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { JOYCE_LIN } from '../../../../shared/infrastructure/fixtures/speakers'

export class LoginSpeakerRequestDTO {
  @ApiProperty({ example: JOYCE_LIN.email })
  @IsString()
  email!: string

  @ApiProperty({ example: JOYCE_LIN.password })
  @IsString()
  password!: string
}
