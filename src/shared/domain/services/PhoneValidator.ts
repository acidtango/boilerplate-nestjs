export const PHONE_VALIDATOR_TOKEN = 'PhoneValidator'

export interface PhoneValidator {
  validate(phone: string): Promise<boolean>
}
