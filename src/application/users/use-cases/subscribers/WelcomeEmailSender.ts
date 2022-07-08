import { DomainEventSubscriber } from '../../../../shared/domain/events/DomainEventSubscriber'
import { UserCreated } from '../../domain/events/UserCreated'
import { Inject, Injectable } from '@nestjs/common'
import { HandleEvent } from '../../../../shared/domain/events/HandleEvent'
import { DomainId } from '../../../../shared/domain/hex/DomainId'
import { SMSClient, SMS_CLIENT_TOKEN } from '../../../../shared/domain/services/SMSClient'

@Injectable()
export class WelcomeEmailSender extends DomainEventSubscriber<UserCreated> {
  constructor(@Inject(SMS_CLIENT_TOKEN) private smsClient: SMSClient) {
    super()
  }

  @HandleEvent(UserCreated)
  async on(userCreated: UserCreated) {
    this.smsClient.send(userCreated.phone, 'Welcome to our site!')
  }
}
