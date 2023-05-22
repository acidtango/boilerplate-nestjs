import { EmailAddress } from './EmailAddress'

describe('EmailAddress', () => {
  it('can be converted to string', () => {
    const emailString = 'someone@example.com'
    const email = new EmailAddress(emailString)

    const asString = `${email}`

    expect(asString).toEqual(emailString)
  })
})
