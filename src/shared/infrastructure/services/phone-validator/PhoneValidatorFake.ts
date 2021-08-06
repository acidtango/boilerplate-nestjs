import { Injectable } from '@nestjs/common'
import { PhoneValidator } from '../../../domain/services/PhoneValidator'

@Injectable()
export class PhoneValidatorFake implements PhoneValidator {
  async validate(phone: string): Promise<boolean> {
    return phone !== 'invalid-phone'
  }
}
