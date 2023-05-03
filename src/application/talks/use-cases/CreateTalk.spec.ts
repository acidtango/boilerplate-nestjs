import { TalkRepositoryFake } from '../../../../test/fakes/TalkRepositoryFake'
import { CODEMOTION } from '../../../shared/fixtures/events'
import { JOYCE_LIN } from '../../../shared/fixtures/speakers'
import { API_TALK } from '../../../shared/fixtures/talks'
import { TalkStatus } from '../domain/TalkStatus'
import { CreateTalk, CreateTalkParams } from './CreateTalk'
import { EventRepositoryMemory } from '../../events/infrastructure/repositories/EventRepositoryMemory'
import { createCodemotionEvent } from '../../../../test/mother/TalkEventMother'
import { TalkEventNotFoundError } from '../../events/domain/errors/TalkEventNotFoundError'

describe('CreateTalk', () => {
  it('creates the a proposal talk', async () => {
    const talkRepository = TalkRepositoryFake.empty()
    const eventRepository = new EventRepositoryMemory()
    await eventRepository.save(createCodemotionEvent())
    const createTalk = new CreateTalk(talkRepository, eventRepository)
    const params = generateCreateApiTalkParams()

    await createTalk.execute(params)

    const talk = talkRepository.getLatestSavedTalk()
    expect(talk.getCurrentStatus() === TalkStatus.PROPOSAL).toBe(true)
  })

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
