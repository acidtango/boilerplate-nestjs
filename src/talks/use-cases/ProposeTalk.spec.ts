import { TalkRepositoryFake } from '../../../test/fakes/TalkRepositoryFake'
import { CODEMOTION_2, JSDAY_CANARIAS } from '../../shared/infrastructure/fixtures/events'
import { CONCHA_ASENSIO } from '../../shared/infrastructure/fixtures/speakers'
import { API_TALK } from '../../shared/infrastructure/fixtures/talks'
import { EventId } from '../../shared/domain/models/ids/EventId'
import { SpeakerId } from '../../shared/domain/models/ids/SpeakerId'
import { TalkDescription } from '../domain/TalkDescription'
import { TalkId } from '../../shared/domain/models/ids/TalkId'
import { TalkStatus } from '../domain/TalkStatus'
import { TalkTitle } from '../domain/TalkTitle'
import { ProposeTalk, ProposeTalkParams } from './ProposeTalk'
import { EventRepositoryMemory } from '../../events/infrastructure/repositories/EventRepositoryMemory'
import { createCodemotionEvent } from '../../../test/mother/TalkEventMother'
import { TalkEventNotFoundError } from '../../events/domain/errors/TalkEventNotFoundError'
import { SpeakerRepositoryFake } from '../../../test/fakes/SpeakerRepositoryFake'
import {
  conchaId,
  conchaSpeakerWithoutProfile,
  conchaSpeakerWithProfile,
} from '../../../test/mother/SpeakerMother'
import { ProfileNotFilledError } from '../../speakers/domain/errors/ProfileNotFilledError'
import { SpeakerNotFoundError } from '../../speakers/domain/errors/SpeakerNotFoundError'

describe('ProposeTalk', () => {
  let talkRepository: TalkRepositoryFake
  let speakerRepository: SpeakerRepositoryFake
  let eventRepository: EventRepositoryMemory

  beforeEach(async () => {
    talkRepository = TalkRepositoryFake.empty()
    eventRepository = new EventRepositoryMemory()
    speakerRepository = SpeakerRepositoryFake.with(conchaSpeakerWithProfile())
    await eventRepository.save(createCodemotionEvent())
  })

  it('creates the a proposal talk', async () => {
    const proposeTalk = new ProposeTalk(talkRepository, eventRepository, speakerRepository)
    const params = generateCreateApiTalkParams({})

    await proposeTalk.execute(params)

    const talk = talkRepository.getLatestSavedTalk()
    expect(talk.hasStatus(TalkStatus.PROPOSAL)).toBe(true)
  })

  it('fails if eventId does not exists', async () => {
    const proposeTalk = new ProposeTalk(talkRepository, eventRepository, speakerRepository)
    const notExistingEventId = new EventId(CODEMOTION_2.id)
    const params = generateCreateApiTalkParams({ eventId: notExistingEventId })

    const result = proposeTalk.execute(params)

    await expect(result).rejects.toThrow(new TalkEventNotFoundError(notExistingEventId))
  })

  it('fails if the speaker does not have a filled profile', async () => {
    speakerRepository = SpeakerRepositoryFake.with(conchaSpeakerWithoutProfile())
    const proposeTalk = new ProposeTalk(talkRepository, eventRepository, speakerRepository)
    const params = generateCreateApiTalkParams()

    const result = proposeTalk.execute(params)

    await expect(result).rejects.toThrow(new ProfileNotFilledError(conchaId()))
  })

  it('fails if the speaker does not exists', async () => {
    const proposeTalk = new ProposeTalk(talkRepository, eventRepository, speakerRepository)
    const speakerId = new SpeakerId('not-existent-id')
    const params = generateCreateApiTalkParams({ speakerId })

    const result = proposeTalk.execute(params)

    await expect(result).rejects.toThrow(new SpeakerNotFoundError(speakerId))
  })
})

function generateCreateApiTalkParams({
  eventId = new EventId(JSDAY_CANARIAS.id),
  speakerId = new SpeakerId(CONCHA_ASENSIO.id),
} = {}): ProposeTalkParams {
  return {
    id: new TalkId(API_TALK.id),
    title: new TalkTitle(API_TALK.title),
    description: new TalkDescription(API_TALK.description),
    cospeakers: API_TALK.cospeakers.map(SpeakerId.fromPrimitives),
    language: API_TALK.language,
    eventId: eventId,
    speakerId,
  }
}
