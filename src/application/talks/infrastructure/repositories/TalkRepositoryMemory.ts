import { Injectable } from '@nestjs/common'
import { TalkRepository } from '../../domain/TalkRepository'
import { Talk } from '../../domain/Talk'
import { Reseteable } from '../../../../shared/infrastructure/repositories/Reseteable'

@Injectable()
export class TalkRepositoryMemory implements TalkRepository, Reseteable {
  protected talks: Map<string, Talk> = new Map()

  protected saveSync(talk: Talk) {
    this.talks.set(talk.id, {
      id: talk.id,
      title: talk.title,
      description: talk.description,
      language: talk.language,
      cospeakers: talk.cospeakers,
      speakerId: talk.speakerId,
      reviewerId: talk.reviewerId,
      eventId: talk.eventId,
      isApproved: talk.isApproved,
    })
  }

  async findBy(talkId: string): Promise<Talk | undefined> {
    return this.talks.get(talkId)
  }

  async save(talk: Talk): Promise<void> {
    this.talks.set(talk.id, {
      id: talk.id,
      title: talk.title,
      description: talk.description,
      language: talk.language,
      cospeakers: talk.cospeakers,
      speakerId: talk.speakerId,
      reviewerId: talk.reviewerId,
      eventId: talk.eventId,
      isApproved: talk.isApproved,
    })
  }

  async reset() {
    this.talks.clear()
  }
}
