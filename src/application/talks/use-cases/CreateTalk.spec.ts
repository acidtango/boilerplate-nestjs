import { TalkRepositoryFake } from '../../../../test/fakes/TalkRepositoryFake'
import { CODEMOTION } from '../../../shared/fixtures/events'
import { JOYCE_LIN } from '../../../shared/fixtures/speakers'
import { API_TALK } from '../../../shared/fixtures/talks'
import { EventId } from '../../../shared/domain/ids/EventId'
import { SpeakerId } from '../../../shared/domain/ids/SpeakerId'
import { TalkDescription } from '../domain/TalkDescription'
import { TalkId } from '../../../shared/domain/ids/TalkId'
import { TalkStatus } from '../domain/TalkStatus'
import { TalkTitle } from '../domain/TalkTitle'
import { CreateTalk, CreateTalkParams } from './CreateTalk'

describe('CreateTalk', () => {
  it('creates the a proposal talk', async () => {
    const talkRepository = TalkRepositoryFake.empty()
    const createTalk = new CreateTalk(talkRepository)
    const params = generateCreateApiTalkParams()

    await createTalk.execute(params)

    const talk = talkRepository.getLatestSavedTalk()
    expect(talk.getStatus()).toBe(TalkStatus.PROPOSAL)
  })
})

function generateCreateApiTalkParams(): CreateTalkParams {
  return {
    id: new TalkId(API_TALK.id),
    title: new TalkTitle(API_TALK.title),
    description: new TalkDescription(API_TALK.description),
    cospeakers: API_TALK.cospeakers,
    language: API_TALK.language,
    eventId: new EventId(CODEMOTION.id),
    speakerId: new SpeakerId(JOYCE_LIN.id),
  }
}
