import { Body, Controller, Get, Inject, Param, Post, Query } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { UserCreator } from '../../application/users/use-cases/UserCreator'
import { UserId } from '../../shared/domain/ids/UserId'
import { UUID_GENERATOR_TOKEN, UuidGenerator } from '../../shared/domain/services/UuidGenerator'
import { ContactDto } from './dtos/ContactDto'
import { CreateUserDto } from './dtos/CreateUserDto'
import { CreateUserResponseDto } from './dtos/CreateUserResponseDto'
import { GetUsersCommonContactsParamsDto } from './dtos/GetUsersCommonContactsParamsDto'
import { GetUsersCommonContactsResponseDto } from './dtos/GetUsersCommonContactsResponseDto'
import { InvalidPhoneNumberDto } from './dtos/InvalidPhoneNumberDto'
import { PhoneAlreadyInUseDto } from './dtos/PhoneAlreadyInUseDto'
import { UserContactsUpdater } from '../../application/users/use-cases/UserContactsUpdater'
import { UserContactsInCommonFetcher } from '../../application/users/use-cases/UserContactsInCommonFetcher'
import { UserContactsLister } from '../../application/users/use-cases/UserContactsLister'
import { UserPhoneNumber } from '../../application/users/domain/UserPhoneNumber'
import { Contacts } from '../../application/users/domain/UserContacts'

@ApiTags('Users')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(
    @Inject(UUID_GENERATOR_TOKEN) private uuidGenerator: UuidGenerator,
    private userCreator: UserCreator,
    private userContactsUpdater: UserContactsUpdater,
    private userContactsLister: UserContactsLister,
    private contactsInCommonFetcher: UserContactsInCommonFetcher
  ) {}

  @ApiOperation({ summary: 'Creates a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({
    description: 'The user is created successfully',
    type: CreateUserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'The phone number is not a well formatted E.164 phone number',
    type: InvalidPhoneNumberDto,
  })
  @ApiConflictResponse({
    description: 'The phone provided is being used by another user',
    type: PhoneAlreadyInUseDto,
  })
  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<CreateUserResponseDto> {
    const user = await this.userCreator.execute(
      new UserId(this.uuidGenerator.generate()),
      body.name,
      body.lastName,
      UserPhoneNumber.fromPrimitives(body.phone)
    )

    return CreateUserResponseDto.from(user)
  }

  @ApiOperation({ summary: 'Updates the user contacts' })
  @ApiBody({ type: ContactDto, isArray: true })
  @Post(':id/contacts')
  async updateUserContacts(@Param('id') userId: string, @Body() body: ContactDto[]): Promise<void> {
    const updatedContacts = Contacts.fromPrimitives(body)

    await this.userContactsUpdater.execute(UserId.fromPrimitives(userId), updatedContacts)
  }

  @ApiOperation({ summary: 'Retrieves the user contacts' })
  @ApiOkResponse({
    description: 'All user contacts are returned',
    type: [ContactDto],
  })
  @Get(':id/contacts')
  async getUserContacts(@Param('id') userId: string): Promise<ContactDto[]> {
    const user = await this.userContactsLister.execute(UserId.fromPrimitives(userId))

    console.log('El usuario', user)

    const userPrimitives = user.toPrimitives()

    return userPrimitives.contacts.map(ContactDto.fromDomain)
  }

  @ApiOperation({
    summary:
      'Retrieves the contacts in common between two users, common contacts should be registered too',
  })
  @ApiOkResponse({
    description: 'Users common contacts that are registered are returned',
    type: [GetUsersCommonContactsResponseDto],
  })
  @Get('/common-contacts')
  async getUsersCommonContacts(
    @Query() { userId1, userId2 }: GetUsersCommonContactsParamsDto
  ): Promise<GetUsersCommonContactsResponseDto[]> {
    const commonContacts = await this.contactsInCommonFetcher.execute(
      UserId.fromPrimitives(userId1),
      UserId.fromPrimitives(userId2)
    )

    const phones = commonContacts.toPrimitives().map((contact) => contact.phone)

    return GetUsersCommonContactsResponseDto.from(phones)
  }
}
