import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsInt, IsPositive, IsString } from 'class-validator'
import { JOYCE_LIN } from '../../../../shared/infrastructure/fixtures/speakers'
import { Language } from '../../../../shared/domain/models/Language'

export class SpeakerProfileDTO {
  @ApiProperty({ example: JOYCE_LIN.name })
  @IsString()
  name!: string

  @ApiProperty({ example: JOYCE_LIN.age })
  @IsPositive()
  @IsInt()
  age!: number

  @ApiProperty({ example: JOYCE_LIN.language, type: Language })
  @IsEnum(Language)
  language!: string

  static create(params: SpeakerProfileDTO) {
    const speakerProfileDTO = new SpeakerProfileDTO()

    speakerProfileDTO.name = params.name
    speakerProfileDTO.age = params.age
    speakerProfileDTO.language = params.language

    return speakerProfileDTO
  }
}
