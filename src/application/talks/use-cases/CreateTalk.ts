import { Inject, Injectable } from '@nestjs/common'
import { UseCase } from '../../../shared/domain/hex/UseCase'
import { AppProvider } from '../../AppProviders'
import { Language } from '../../shared/domain/Language'
import { Talk } from '../domain/Talk'
import { TalkEventNotFoundError } from '../../events/domain/errors/TalkEventNotFoundError'
import { EventRepository } from '../../events/domain/EventRepository'
import { MaximumCospeakersReachedError } from '../domain/errors/MaximumCospeakersReachedError'
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from '../../shared/constants'
import { TalkTitleTooLongError } from '../domain/errors/TalkTitleTooLongError'
import { TalkDescriptionTooLongError } from '../domain/errors/TalkDescriptionTooLongError'
import { Collection, MongoClient } from 'mongodb'
import { config } from '../../../config'

export type CreateTalkParams = {
  id: string
  title: string
  description: string
  cospeakers: string[]
  language: Language
  eventId: string
  speakerId: string
}

@Injectable()
export class CreateTalk extends UseCase {
  private readonly talks: Collection<Talk>

  constructor(
    @Inject(AppProvider.EVENT_REPOSITORY) private readonly eventRepository: EventRepository,
    private readonly client: MongoClient
  ) {
    super()
    const db = client.db(config.db.database)
    this.talks = db.collection('talks')
  }

  async execute({
    cospeakers,
    description,
    eventId,
    id,
    language,
    speakerId,
    title,
  }: CreateTalkParams) {
    if (!(await this.eventRepository.exists(eventId))) {
      throw new TalkEventNotFoundError(eventId)
    }

    if (cospeakers.length >= 4) throw new MaximumCospeakersReachedError()
    if (title.length > MAX_TITLE_LENGTH) {
      throw new TalkTitleTooLongError()
    }
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      throw new TalkDescriptionTooLongError()
    }

    const talk: Talk = {
      id: id,
      title: title,
      description: description,
      language: language,
      cospeakers: cospeakers,
      speakerId: speakerId,
      reviewerId: undefined,
      eventId: eventId,
      isApproved: undefined,
    }

    await this.talks.updateOne({ id: talk.id }, { $set: talk }, { upsert: true })
  }
}
