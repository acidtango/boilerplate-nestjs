import { ApiProperty } from '@nestjs/swagger'
import { IsPhoneNumber, IsString, Length } from 'class-validator'
import { User } from '../../../application/users/domain/User'
import { MICHAEL } from '../../../shared/fixtures/users'

export default class CreateUserResponseDto {
  @ApiProperty({
    description: 'Id of the user',
    example: '8275cf5f-c871-4d1a-bbcb-97549567b705',
  })
  @IsString()
  public id: string

  @ApiProperty({ description: 'Name of the user', example: MICHAEL.name, maxLength: 36 })
  @IsString()
  @Length(0, 36)
  public name: string

  @ApiProperty({
    description: 'Last name of the user',
    example: MICHAEL.lastName,
  })
  @IsString()
  public lastName: string

  @ApiProperty({
    description: 'Phone number of the user',
    example: MICHAEL.phone,
  })
  @IsPhoneNumber()
  public phone: string

  static from(user: User) {
    const userPrimitives = user.toPrimitives()

    return new CreateUserResponseDto({
      id: userPrimitives.id,
      name: userPrimitives.name,
      lastName: userPrimitives.lastName,
      phone: userPrimitives.phone,
    })
  }

  constructor({
    id,
    name,
    lastName,
    phone,
  }: {
    id: string
    name: string
    lastName: string
    phone: string
  }) {
    this.id = id
    this.name = name
    this.lastName = lastName
    this.phone = phone
  }
}
