import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsInt, IsPositive, IsString } from 'class-validator'
import { CONCHA_ASENSIO } from '../../../../shared/infrastructure/fixtures/speakers'
import { Language } from '../../../../shared/domain/models/Language'

export class SpeakerProfileDTO {
  @ApiProperty({ example: CONCHA_ASENSIO.name })
  @IsString()
  name!: string

  @ApiProperty({ example: CONCHA_ASENSIO.age })
  @IsPositive()
  @IsInt()
  age!: number

  @ApiProperty({ example: CONCHA_ASENSIO.language, enum: Language })
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
