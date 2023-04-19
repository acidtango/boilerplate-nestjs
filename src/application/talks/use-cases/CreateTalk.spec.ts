import { CreateTalk, CreateTalkParams } from './CreateTalk'
import { API_TALK } from '../../../shared/fixtures/talks'
import { TalkId } from '../domain/TalkId'
import { TalkTitle } from '../domain/TalkTitle'
import { TalkDescription } from '../domain/TalkDescription'
import { TalkRepositoryFake } from '../../../../test/fakes/TalkRepositoryFake'
import { TalkStatus } from '../domain/TalkStatus'

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
  }
}
