import { SMSClient } from '../../../domain/services/SMSClient'

export class SMSClientFake implements SMSClient {
  // private spy = jest.fn()

  async send(phone: string, context: string): Promise<void> {
    // this.spy(phone, context)
  }

  expectToHaveBeenCalledWithPhone(phone: string) {
    // expect(this.spy).toHaveBeenCalledWith(phone, expect.any(String))
  }
}
