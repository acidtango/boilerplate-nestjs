import { CODEMOTION } from '../../../shared/fixtures/events'
import { JOYCE_LIN } from '../../../shared/fixtures/speakers'
import { API_TALK } from '../../../shared/fixtures/talks'
import { CreateTalk, CreateTalkParams } from './CreateTalk'
import { EventRepositoryMemory } from '../../events/infrastructure/repositories/EventRepositoryMemory'
import { TalkEventNotFoundError } from '../../events/domain/errors/TalkEventNotFoundError'
import { createMongoClientMemory } from '../../shared/infrastructure/createMongoClientMemory'

describe('CreateTalk', () => {
  it('fails if eventId does not exists', async () => {
    const eventRepository = new EventRepositoryMemory()
    const mongoClient = createMongoClientMemory()
    const createTalk = new CreateTalk(eventRepository, mongoClient)
    const params = generateCreateApiTalkParams()

    await expect(createTalk.execute(params)).rejects.toThrow(
      new TalkEventNotFoundError(CODEMOTION.id)
    )
  })
})

function generateCreateApiTalkParams(): CreateTalkParams {
  return {
    id: API_TALK.id,
    title: API_TALK.title,
    description: API_TALK.description,
    cospeakers: API_TALK.cospeakers,
    language: API_TALK.language,
    eventId: CODEMOTION.id,
    speakerId: JOYCE_LIN.id,
  }
}
