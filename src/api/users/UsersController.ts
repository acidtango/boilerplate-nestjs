import { Body, Controller, Get, Inject, Param, Post, Query } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { Contact } from '../../application/users/domain/Contact'
import { ContactsInCommonFetcher } from '../../application/users/use-cases/ContactsInCommonFetcher'
import { UserContactsUpdater } from '../../application/users/use-cases/UserContactsUpdater'
import { UserCreator } from '../../application/users/use-cases/UserCreator'
import { UserFinder } from '../../application/users/use-cases/UserFinder'
import { UserId } from '../../shared/domain/ids/UserId'
import { UuidGenerator, UUID_GENERATOR_TOKEN } from '../../shared/domain/services/UuidGenerator'
import { ContactDto } from './dtos/ContactDto'
import { CreateUserDto } from './dtos/CreateUserDto'
import { CreateUserResponseDto } from './dtos/CreateUserResponseDto'
import { GetUsersCommonContactsParamsDto } from './dtos/GetUsersCommonContactsParamsDto'
import { GetUsersCommonContactsResponseDto } from './dtos/GetUsersCommonContactsResponseDto'
import { InvalidPhoneNumberDto } from './dtos/InvalidPhoneNumberDto'
import { PhoneAlreadyInUseDto } from './dtos/PhoneAlreadyInUseDto'

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
    private userFinder: UserFinder,
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
      body.phone
    )

    return CreateUserResponseDto.from(user)
  }

  @ApiOperation({ summary: 'Updates the user contacts' })
  @ApiBody({ type: ContactDto, isArray: true })
  @Post(':id/contacts')
  async updateUserContacts(@Param('id') userId: string, @Body() body: ContactDto[]): Promise<void> {
    const contacts = body.map((contact) => new Contact(contact.name, contact.phone))

    await this.userContactsUpdater.execute(UserId.fromPrimitives(userId), contacts)
  }

  @ApiOperation({ summary: 'Retrieves the user contacts' })
  @ApiOkResponse({
    description: 'All user contacts are returned',
    type: [ContactDto],
  })
  @Get(':id/contacts')
  async getUserContacts(@Param('id') userId: string): Promise<ContactDto[]> {
    const user = await this.userFinder.execute(UserId.fromPrimitives(userId))

    return user.toPrimitives().contacts.map((contact) => ContactDto.fromDomain(contact))
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
    const commonPhoneNumbers = await this.contactsInCommonFetcher.execute(
      UserId.fromPrimitives(userId1),
      UserId.fromPrimitives(userId2)
    )

    return GetUsersCommonContactsResponseDto.from(commonPhoneNumbers)
  }
}
