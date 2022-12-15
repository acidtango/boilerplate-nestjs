export interface PhoneValidator {
  validate(phone: string): Promise<boolean>
}
