import { DomainService } from '../../../shared/domain/hex/DomainService'
import { TalkRepository } from './TalkRepository'
import { TalkId } from '../../../shared/domain/ids/TalkId'
import { TalkNotFoundError } from './errors/TalkNotFoundError'

export class TalkFinder extends DomainService {
  constructor(private readonly talkRepository: TalkRepository) {
    super()
  }

  async findOrThrow(talkId: TalkId) {
    const talk = await this.talkRepository.findById(talkId)

    if (!talk) {
      throw new TalkNotFoundError(talkId)
    }

    return talk
  }
}
