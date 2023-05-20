import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNumber, IsString, IsUUID } from 'class-validator'
import { JOYCE_LIN } from '../../../../shared/infrastructure/fixtures/speakers'
import { Language } from '../../../../shared/domain/models/Language'

export class CreateSpeakerRequestDTO {
  @ApiProperty({ example: JOYCE_LIN.id })
  @IsUUID()
  id!: string

  @ApiProperty({ example: JOYCE_LIN.name })
  @IsString()
  name!: string

  @ApiProperty({ example: JOYCE_LIN.age })
  @IsNumber()
  age!: number

  @ApiProperty({ example: Language.ENGLISH, enum: Language })
  @IsEnum(Language)
  language!: Language

  @ApiProperty({ example: JOYCE_LIN.email })
  email!: string
}
