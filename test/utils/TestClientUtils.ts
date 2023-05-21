import { TestClient } from './TestClient'

export class TestClientUtils extends TestClient {
  /**
   * Add here utils method that chain several calls
   * For example:
   * 1. Register an user
   * 2. Validate the email
   * 3. Establish a password
   *
   * This consists of several TestClient calls
   */

  async createConcha() {
    await this.registerSpeaker().run()
    await this.updateProfile().run()
  }

  async createJsDayCanarias() {
    await this.createEvent().run()
  }
}
