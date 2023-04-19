import { DomainId } from '../../../shared/domain/hex/DomainId'

export class SpeakerId extends DomainId {
  private readonly TOKEN = 'SpeakerId'

  static fromPrimitives(id: string): SpeakerId {
    return new SpeakerId(id)
  }
}
