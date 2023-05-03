import { DomainService } from '../../../shared/domain/hex/DomainService'
import { TalkRepository } from './TalkRepository'
import { TalkNotFoundError } from './errors/TalkNotFoundError'

export class TalkFinder extends DomainService {
  constructor(private readonly talkRepository: TalkRepository) {
    super()
  }

  async findOrThrow(talkId: string) {
    const talk = await this.talkRepository.findBy(talkId)

    if (!talk) {
      throw new TalkNotFoundError(talkId)
    }

    return talk
  }
}
