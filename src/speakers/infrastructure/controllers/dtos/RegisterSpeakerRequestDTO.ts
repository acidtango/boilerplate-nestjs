import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUUID } from 'class-validator'
import { PAOLA } from '../../../../shared/infrastructure/fixtures/speakers'

export class RegisterSpeakerRequestDTO {
  @ApiProperty({ example: PAOLA.id })
  @IsUUID()
  id!: string

  @ApiProperty({ example: PAOLA.email })
  @IsString()
  email!: string

  @ApiProperty({ example: PAOLA.password })
  @IsString()
  password!: string
}
