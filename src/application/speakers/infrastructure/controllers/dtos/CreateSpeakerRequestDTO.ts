import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNumber, IsString, IsUUID } from 'class-validator'
import { JOYCE_LIN } from '../../../../../shared/fixtures/speakers'
import { Language } from '../../../../shared/domain/Language'

type CreateSpeakerRequestDTOParams = {
  id: string
  name: string
  age: number
  language: Language
  email: string
}

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

  static create(params: CreateSpeakerRequestDTOParams) {
    const createEventRequestDTO = new CreateSpeakerRequestDTO()

    createEventRequestDTO.id = params.id
    createEventRequestDTO.name = params.name
    createEventRequestDTO.age = params.age
    createEventRequestDTO.email = params.email
    createEventRequestDTO.language = params.language

    return createEventRequestDTO
  }
}
