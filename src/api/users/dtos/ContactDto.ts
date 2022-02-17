import { ApiProperty } from '@nestjs/swagger'
import { IsPhoneNumber, IsString, Length } from 'class-validator'
import { OLIVER_CONTACT } from '../../../shared/fixtures/users'
import { ContactPrimitives } from '../../../application/users/domain/UserContact'

export class ContactDto {
  @ApiProperty({
    description: 'Name of the contact',
    example: OLIVER_CONTACT.name,
    maxLength: 36,
  })
  @IsString()
  @Length(0, 36)
  public name: string

  @ApiProperty({
    description: 'Phone number of the contact',
    example: OLIVER_CONTACT.phone,
  })
  @IsPhoneNumber()
  public phone: string

  static fromDomain(contact: ContactPrimitives) {
    return new ContactDto({ name: contact.name, phone: contact.phone })
  }

  constructor({ name, phone }: { name: string; phone: string }) {
    this.name = name
    this.phone = phone
  }
}
