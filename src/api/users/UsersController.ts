import { Body, Controller, Get, Inject, Param, Post, Query } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { Contact } from '../../application/contacts/domain/Contact'
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
import { UserContactsUpdater } from '../../application/contacts/use-cases/UserContactsUpdater'
import { ContactsInCommonFetcher } from '../../application/contacts/use-cases/ContactsInCommonFetcher'
import { UserContactsLister } from '../../application/contacts/use-cases/UserContactsLister'
import { UserPhoneNumber } from '../../application/users/domain/UserPhoneNumber'

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
    private contactsInCommonFetcher: ContactsInCommonFetcher
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
    const contactsNews = body.map((contact) =>
      Contact.fromPrimitives({
        name: contact.name,
        phone: contact.phone,
        owner: userId,
      })
    )

    await this.userContactsUpdater.execute(contactsNews)
  }

  @ApiOperation({ summary: 'Retrieves the user contacts' })
  @ApiOkResponse({
    description: 'All user contacts are returned',
    type: [ContactDto],
  })
  @Get(':id/contacts')
  async getUserContacts(@Param('id') userId: string): Promise<ContactDto[]> {
    const contacts = await this.userContactsLister.execute(UserId.fromPrimitives(userId))

    return contacts.toPrimitives().contacts.map((contact) => ContactDto.fromDomain(contact))
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

    const phones = commonContacts.toPrimitives().contacts.map((contact) => contact.phone)

    return GetUsersCommonContactsResponseDto.from(phones)
  }
}
