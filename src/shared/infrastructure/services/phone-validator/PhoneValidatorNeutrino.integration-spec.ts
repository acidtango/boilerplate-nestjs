import { HttpService } from '@nestjs/axios'
import { PhoneValidatorNeutrino } from './PhoneValidatorNeutrino'
import { PhoneValidator } from '../../../domain/services/PhoneValidator'
import { describeThirdParty } from '../../../../../test/utils/describeThirdParty'

describeThirdParty('PhoneValidatorNeutrino', () => {
  let phoneValidator: PhoneValidator

  beforeEach(() => {
    phoneValidator = new PhoneValidatorNeutrino(new HttpService())
  })

  it('returns true if the given phone is valid', async () => {
    const aValidPhone = '+34671616849'

    const isValid = await phoneValidator.validate(aValidPhone)

    expect(isValid).toBe(true)
  })

  it('returns true if the given phone is invalid', async () => {
    const anInvalidPhone = '+34671616'

    const isValid = await phoneValidator.validate(anInvalidPhone)

    expect(isValid).toBe(false)
  })
})
