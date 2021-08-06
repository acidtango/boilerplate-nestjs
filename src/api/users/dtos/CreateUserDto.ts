import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'
import { MICHAEL } from '../../../shared/fixtures/users'

export default class CreateUserDto {
  @ApiProperty({ description: 'Name of the user', example: MICHAEL.name, maxLength: 36 })
  @IsString()
  @Length(0, 36)
  public name!: string

  @ApiProperty({
    description: 'Last name of the user',
    example: MICHAEL.lastName,
  })
  @IsString()
  public lastName!: string

  @ApiProperty({
    description: 'Phone number of the user',
    example: MICHAEL.phone,
  })
  @IsString() // IsMobilePhone could be used instead but we're using Neutrino API to validate the phone.
  public phone!: string
}
