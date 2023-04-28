import { TalkRepositoryFake } from '../../../../test/fakes/TalkRepositoryFake'
import { CODEMOTION } from '../../../shared/fixtures/events'
import { JOYCE_LIN } from '../../../shared/fixtures/speakers'
import { API_TALK } from '../../../shared/fixtures/talks'
import { CreateTalk, CreateTalkParams } from './CreateTalk'
import { EventRepositoryMemory } from '../../events/infrastructure/repositories/EventRepositoryMemory'
import { TalkEventNotFoundError } from '../../events/domain/errors/TalkEventNotFoundError'

describe('CreateTalk', () => {
  it('fails if eventId does not exists', async () => {
    const talkRepository = TalkRepositoryFake.empty()
    const eventRepository = new EventRepositoryMemory()
    const createTalk = new CreateTalk(talkRepository, eventRepository)
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
