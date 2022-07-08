import { HttpStatus, INestApplication } from '@nestjs/common'
import { Server } from 'http'
import tepper from 'tepper'
import { MICHAEL } from '../../src/shared/fixtures/users'
import { AppBuilder } from './AppBuilder'

export class TestClient {
  private static instances: TestClient[] = []

  public static async teardownApps() {
    for (const instance of this.instances) {
      await instance.closeApp()
    }

    this.instances = []
  }

  static async create() {
    const app = await AppBuilder.build()
    const server = app.getHttpServer()
    const testClient = new TestClient(app, server)
    this.instances.push(testClient)
    return testClient
  }

  constructor(private app: INestApplication, private server: Server) {}

  get<T>(dependencyKey: string) {
    return this.app.get<T>(dependencyKey)
  }

  health() {
    return tepper(this.server).get('/health')
  }

  createUser({ name = MICHAEL.name, lastName = MICHAEL.lastName, phone = MICHAEL.phone } = {}) {
    return tepper(this.server)
      .post('/api/v1/users')
      .send({
        name,
        lastName,
        phone,
      })
      .expect(HttpStatus.CREATED)
  }

  updateUserContacts({ id = '', contacts = MICHAEL.contacts } = {}) {
    return tepper(this.server)
      .post(`/api/v1/users/${id}/contacts`)
      .expect(HttpStatus.CREATED)
      .send(contacts)
  }

  getUserContacts({ id = '' }) {
    return tepper(this.server).get(`/api/v1/users/${id}/contacts`).expect(HttpStatus.OK)
  }

  getCommonContacts(userId1: string, userId2: string) {
    return tepper(this.server)
      .get(`/api/v1/users/common-contacts`)
      .withQuery({
        userId1,
        userId2,
      })
      .expect(HttpStatus.OK)
  }

  async closeApp() {
    await this.app.close()
    await new Promise<void>((resolve, reject) => {
      this.server.close((error) => {
        if (error) reject(error)
        resolve()
      })
    })
  }
}
