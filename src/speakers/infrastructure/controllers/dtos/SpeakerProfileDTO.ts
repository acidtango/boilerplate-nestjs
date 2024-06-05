import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsInt, IsPositive, IsString } from 'class-validator'
import { PAOLA } from '../../../../shared/infrastructure/fixtures/speakers'
import { Language } from '../../../../shared/domain/models/Language'

export class SpeakerProfileDTO {
  @ApiProperty({ example: PAOLA.name })
  @IsString()
  name!: string

  @ApiProperty({ example: PAOLA.age })
  @IsPositive()
  @IsInt()
  age!: number

  @ApiProperty({ example: PAOLA.language, enum: Language })
  @IsEnum(Language)
  language!: Language

  static create(params: SpeakerProfileDTO) {
    const speakerProfileDTO = new SpeakerProfileDTO()

    speakerProfileDTO.name = params.name
    speakerProfileDTO.age = params.age
    speakerProfileDTO.language = params.language

    return speakerProfileDTO
  }
}
