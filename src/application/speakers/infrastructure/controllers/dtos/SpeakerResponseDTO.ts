import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNumber, IsString, IsUUID } from 'class-validator'
import { JOYCE_LIN } from '../../../../../shared/fixtures/speakers'
import { Language } from '../../../../shared/domain/Language'

type EventResponseDTOParams = {
  id: string
  name: string
  age: number
  language: Language
  email: string
  isEmailValidated: boolean
}

export class SpeakerResponseDTO {
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

  @ApiProperty({ example: true })
  isEmailValidated!: boolean

  static create(params: EventResponseDTOParams) {
    const createEventRequestDTO = new SpeakerResponseDTO()

    createEventRequestDTO.id = params.id
    createEventRequestDTO.name = params.name
    createEventRequestDTO.age = params.age
    createEventRequestDTO.email = params.email
    createEventRequestDTO.language = params.language
    createEventRequestDTO.isEmailValidated = params.isEmailValidated

    return createEventRequestDTO
  }
}
