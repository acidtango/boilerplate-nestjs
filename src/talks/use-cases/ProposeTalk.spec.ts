import { TalkRepositoryFake } from '../../../test/fakes/TalkRepositoryFake'
import { VLCTECHFEST } from '../../shared/infrastructure/fixtures/events'
import { PAOLA } from '../../shared/infrastructure/fixtures/speakers'
import { DISCOVERING_TECH_TALENT } from '../../shared/infrastructure/fixtures/talks'
import { EventId } from '../../shared/domain/models/ids/EventId'
import { SpeakerId } from '../../shared/domain/models/ids/SpeakerId'
import { TalkDescription } from '../domain/models/TalkDescription'
import { TalkId } from '../../shared/domain/models/ids/TalkId'
import { TalkStatus } from '../domain/models/TalkStatus'
import { TalkTitle } from '../domain/models/TalkTitle'
import { ProposeTalk, ProposeTalkParams } from './ProposeTalk'
import { EventRepositoryMemory } from '../../events/infrastructure/repositories/EventRepositoryMemory'
import { TalkEventNotFoundError } from '../../events/domain/errors/TalkEventNotFoundError'
import { SpeakerRepositoryFake } from '../../../test/fakes/SpeakerRepositoryFake'
import { ProfileNotFilledError } from '../../speakers/domain/errors/ProfileNotFilledError'
import { SpeakerNotFoundError } from '../../speakers/domain/errors/SpeakerNotFoundError'
import { paolaSpeaker } from '../../../test/mother/SpeakerMother/Paola'
import { vlcTechFestEvent } from '../../../test/mother/EventMother/VlcTechFest'
import { nonExistingSpeakerId } from '../../../test/mother/SpeakerMother/NotImportant'
import { dianaId, dianaSpeakerWithoutProfile } from '../../../test/mother/SpeakerMother/Diana'
import { EventRepositoryFake } from '../../../test/fakes/EventRepositoryFake'
import { nonExistingEventId } from '../../../test/mother/EventMother/NotImportant'
import { EventBusFake } from '../../../test/fakes/EventBusFake'
import { TalkProposed } from '../domain/events/TalkProposed'
import { discoveringTechTalentId } from '../../../test/mother/TalkMother/DiscoveringTechTalent'

describe('ProposeTalk', () => {
  let talkRepository: TalkRepositoryFake
  let speakerRepository: SpeakerRepositoryFake
  let eventRepository: EventRepositoryMemory
  let proposeTalk: ProposeTalk
  let eventBus: EventBusFake

  beforeEach(async () => {
    talkRepository = TalkRepositoryFake.empty()
    eventRepository = EventRepositoryFake.with(vlcTechFestEvent())
    speakerRepository = SpeakerRepositoryFake.with(paolaSpeaker(), dianaSpeakerWithoutProfile())
    eventBus = new EventBusFake()
    proposeTalk = new ProposeTalk(eventBus, talkRepository, eventRepository, speakerRepository)
  })

  it('creates the a proposal talk', async () => {
    const params = juniorXpParams()

    await proposeTalk.execute(params)

    const talk = talkRepository.getLatestSavedTalk()
    expect(talk.hasStatus(TalkStatus.PROPOSAL)).toBe(true)
  })

  it('emits a domain event', async () => {
    const params = juniorXpParams()

    await proposeTalk.execute(params)

    eventBus.expectLastEventToBe(TalkProposed.emit(discoveringTechTalentId()))
  })

  it('fails if eventId does not exists', async () => {
    const eventId = nonExistingEventId()
    const params = juniorXpParams({ eventId })

    const result = proposeTalk.execute(params)

    await expect(result).rejects.toThrow(new TalkEventNotFoundError(eventId))
  })

  it('fails if the speaker does not have a filled profile', async () => {
    const speakerId = dianaId()
    const params = juniorXpParams({ speakerId })

    const result = proposeTalk.execute(params)

    await expect(result).rejects.toThrow(new ProfileNotFilledError(speakerId))
  })

  it('fails if the speaker does not exists', async () => {
    const speakerId = nonExistingSpeakerId()
    const params = juniorXpParams({ speakerId })

    const result = proposeTalk.execute(params)

    await expect(result).rejects.toThrow(new SpeakerNotFoundError(speakerId))
  })
})

function juniorXpParams({
  eventId = new EventId(VLCTECHFEST.id),
  speakerId = new SpeakerId(PAOLA.id),
} = {}): ProposeTalkParams {
  return {
    id: new TalkId(DISCOVERING_TECH_TALENT.id),
    title: new TalkTitle(DISCOVERING_TECH_TALENT.title),
    description: new TalkDescription(DISCOVERING_TECH_TALENT.description),
    cospeakers: DISCOVERING_TECH_TALENT.cospeakers.map(SpeakerId.fromPrimitives),
    language: DISCOVERING_TECH_TALENT.language,
    eventId: eventId,
    speakerId,
  }
}
