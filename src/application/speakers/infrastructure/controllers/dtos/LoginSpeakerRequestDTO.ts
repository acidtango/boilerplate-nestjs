import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { JOYCE_LIN } from '../../../../../shared/fixtures/speakers'

type LoginSpeakerRequestDTOParams = {
  email: string
  password: string
}

export class LoginSpeakerRequestDTO {
  @ApiProperty({ example: JOYCE_LIN.email })
  @IsString()
  email!: string

  @ApiProperty({ example: JOYCE_LIN.password })
  @IsString()
  password!: string

  static create(params: LoginSpeakerRequestDTOParams) {
    const createEventRequestDTO = new LoginSpeakerRequestDTO()

    createEventRequestDTO.email = params.email
    createEventRequestDTO.password = params.password

    return createEventRequestDTO
  }
}
