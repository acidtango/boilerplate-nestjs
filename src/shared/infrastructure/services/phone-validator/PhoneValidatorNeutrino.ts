import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { config } from '../../../../config'
import { PhoneValidator } from '../../../domain/services/PhoneValidator'
import { NeutrinoApiPhoneValidateResponse } from './types/NeutrinoApiPhoneValidateResponse.type'

@Injectable()
export class PhoneValidatorNeutrino implements PhoneValidator {
  private readonly BASE_URL = config.neutrinoApi.baseURL

  private readonly USER_ID = config.neutrinoApi.userId

  private readonly API_KEY = config.neutrinoApi.apiKey

  constructor(private httpService: HttpService) {}

  async validate(phone: string): Promise<boolean> {
    const observable = this.httpService.post<NeutrinoApiPhoneValidateResponse>(
      `${this.BASE_URL}/phone-validate`,
      {
        number: phone,
      },
      {
        headers: {
          'user-id': this.USER_ID,
          'api-key': this.API_KEY,
        },
      }
    )

    const { data } = await firstValueFrom(observable)

    return data.valid
  }
}
