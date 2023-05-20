import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUUID } from 'class-validator'
import { JOYCE_LIN } from '../../../../shared/infrastructure/fixtures/speakers'

export class RegisterSpeakerRequestDTO {
  @ApiProperty({ example: JOYCE_LIN.id })
  @IsUUID()
  id!: string

  @ApiProperty({ example: JOYCE_LIN.email })
  @IsString()
  email!: string

  @ApiProperty({ example: JOYCE_LIN.password })
  @IsString()
  password!: string
}
