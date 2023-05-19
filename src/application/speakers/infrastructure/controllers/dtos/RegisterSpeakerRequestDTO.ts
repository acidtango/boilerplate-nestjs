import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUUID } from 'class-validator'
import { JOYCE_LIN } from '../../../../../shared/fixtures/speakers'

type RegisterSpeakerRequestDTOParams = {
  id: string
  email: string
  password: string
}

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

  static create(params: RegisterSpeakerRequestDTOParams) {
    const createEventRequestDTO = new RegisterSpeakerRequestDTO()

    createEventRequestDTO.id = params.id
    createEventRequestDTO.email = params.email
    createEventRequestDTO.password = params.password

    return createEventRequestDTO
  }
}
