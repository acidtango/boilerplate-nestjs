import { ApiProperty } from '@nestjs/swagger'
import { IsPhoneNumber } from 'class-validator'
import { MICHAEL } from '../../../shared/fixtures/users'

export default class GetUsersCommonContactsResponseDto {
  @ApiProperty({
    description: 'Phone number of the user',
    example: MICHAEL.phone,
  })
  @IsPhoneNumber()
  public phone: string

  static from(phones: string[]) {
    return phones.map((phone) => {
      return new GetUsersCommonContactsResponseDto(phone)
    })
  }

  constructor(phone: string) {
    this.phone = phone
  }
}
