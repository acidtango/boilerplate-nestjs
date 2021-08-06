import { ApiProperty } from '@nestjs/swagger'
import { IsPhoneNumber } from 'class-validator'
import { MICHAEL } from '../../../shared/fixtures/users'

export class GetUsersCommonContactsResponseDto {
  @ApiProperty({
    description: 'Phone number of the user',
    example: MICHAEL.phone,
  })
  @IsPhoneNumber()
  public phone: string

  static from(phones: string[]) {
    return phones.map((phone) => new GetUsersCommonContactsResponseDto(phone))
  }

  constructor(phone: string) {
    this.phone = phone
  }
}
