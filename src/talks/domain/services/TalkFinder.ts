import { DomainService } from '../../../shared/domain/models/hex/DomainService'
import { TalkRepository } from '../repositories/TalkRepository'
import { TalkId } from '../../../shared/domain/models/ids/TalkId'
import { TalkNotFoundError } from '../errors/TalkNotFoundError'

export class TalkFinder extends DomainService {
  constructor(private readonly talkRepository: TalkRepository) {
    super()
  }

  async findOrThrowBy(talkId: TalkId) {
    const talk = await this.talkRepository.findBy(talkId)

    if (!talk) {
      throw new TalkNotFoundError(talkId)
    }

    return talk
  }
}
