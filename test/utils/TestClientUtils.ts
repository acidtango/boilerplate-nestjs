import { HttpStatus } from '@nestjs/common'
import {
  JANE,
  JANE_CONTACT,
  MICHAEL,
  MICHAEL_CONTACT,
  OLIVER,
  OLIVER_CONTACT,
} from '../../src/shared/fixtures/users'
import { TestClient } from './TestClient'

export class TestClientUtils {
  constructor(private client: TestClient) {}

  async createMichaelAndOliverWithJaneInCommonAndRegistered() {
    const { body: michael } = await this.client.createUser(MICHAEL).expect(HttpStatus.CREATED).run()
    const { body: oliver } = await this.client.createUser(OLIVER).expect(HttpStatus.CREATED).run()
    await this.client.createUser(JANE).expect(HttpStatus.CREATED).run()

    await this.client
      .updateUserContacts({
        id: michael.id,
        contacts: [JANE_CONTACT, OLIVER_CONTACT],
      })
      .expect(HttpStatus.CREATED)
      .run()

    await this.client
      .updateUserContacts({
        id: oliver.id,
        contacts: [JANE_CONTACT, MICHAEL_CONTACT],
      })
      .expect(HttpStatus.CREATED)
      .run()

    return { michael, oliver }
  }

  async createMichaelAndOliverWithJaneInCommonButNotRegistered() {
    const { body: michael } = await this.client.createUser(MICHAEL).expect(HttpStatus.CREATED).run()
    const { body: oliver } = await this.client.createUser(OLIVER).expect(HttpStatus.CREATED).run()

    await this.client
      .updateUserContacts({
        id: michael.id,
        contacts: [JANE_CONTACT, OLIVER_CONTACT],
      })
      .expect(HttpStatus.CREATED)
      .run()

    await this.client
      .updateUserContacts({
        id: oliver.id,
        contacts: [JANE_CONTACT, MICHAEL_CONTACT],
      })
      .expect(HttpStatus.CREATED)
      .run()

    return { michael, oliver }
  }
}
