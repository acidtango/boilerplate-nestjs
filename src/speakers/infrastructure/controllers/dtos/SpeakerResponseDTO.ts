import { ApiProperty } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'
import { PAOLA } from '../../../../shared/infrastructure/fixtures/speakers'
import { SpeakerProfileDTO } from './SpeakerProfileDTO'

export class SpeakerResponseDTO {
  @ApiProperty({ example: PAOLA.id })
  @IsUUID()
  id!: string

  @ApiProperty({ example: PAOLA.email })
  email!: string

  @ApiProperty({ example: true })
  isEmailValidated!: boolean

  @ApiProperty({ type: SpeakerProfileDTO })
  profile?: SpeakerProfileDTO

  static create(params: SpeakerResponseDTO) {
    const createEventRequestDTO = new SpeakerResponseDTO()

    createEventRequestDTO.id = params.id
    createEventRequestDTO.email = params.email
    createEventRequestDTO.isEmailValidated = params.isEmailValidated
    createEventRequestDTO.profile = params.profile

    return createEventRequestDTO
  }
}
