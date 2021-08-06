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

export class TestClientUtils extends TestClient {
  async createMichaelAndOliverWithJaneInCommonAndRegistered() {
    const { body: michael } = await this.createUser(MICHAEL).expect(HttpStatus.CREATED).run()
    const { body: oliver } = await this.createUser(OLIVER).expect(HttpStatus.CREATED).run()
    await this.createUser(JANE).expect(HttpStatus.CREATED).run()

    await this.updateUserContacts({
      id: michael.id,
      contacts: [JANE_CONTACT, OLIVER_CONTACT],
    })
      .expect(HttpStatus.CREATED)
      .run()

    await this.updateUserContacts({
      id: oliver.id,
      contacts: [JANE_CONTACT, MICHAEL_CONTACT],
    })
      .expect(HttpStatus.CREATED)
      .run()

    return { michael, oliver }
  }

  async createMichaelAndOliverWithJaneInCommonButNotRegistered() {
    const { body: michael } = await this.createUser(MICHAEL).expect(HttpStatus.CREATED).run()
    const { body: oliver } = await this.createUser(OLIVER).expect(HttpStatus.CREATED).run()

    await this.updateUserContacts({
      id: michael.id,
      contacts: [JANE_CONTACT, OLIVER_CONTACT],
    })
      .expect(HttpStatus.CREATED)
      .run()

    await this.updateUserContacts({
      id: oliver.id,
      contacts: [JANE_CONTACT, MICHAEL_CONTACT],
    })
      .expect(HttpStatus.CREATED)
      .run()

    return { michael, oliver }
  }
}
