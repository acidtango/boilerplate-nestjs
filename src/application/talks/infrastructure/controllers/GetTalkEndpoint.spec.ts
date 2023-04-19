import { createApiTalk } from '../../../../../test/mother/TalkMother'
import { CODEMOTION } from '../../../../shared/fixtures/events'
import { JOYCE_LIN } from '../../../../shared/fixtures/speakers'
import { API_TALK } from '../../../../shared/fixtures/talks'
import { TalkId } from '../../domain/TalkId'
import { GetTalk } from '../../use-cases/GetTalk'
import { GetTalkEndpoint } from './GetTalkEndpoint'

describe('GetTalkEndpoint', () => {
  it('calls the use case with the given id', () => {
    const getTalkUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(createApiTalk())),
    } as unknown as GetTalk
    const endpoint = new GetTalkEndpoint(getTalkUseCase)

    endpoint.execute(API_TALK.id)

    expect(getTalkUseCase.execute).toHaveBeenCalledWith(new TalkId(API_TALK.id))
  })

  it('serializes the speaker if exists', async () => {
    const getTalkUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(createApiTalk())),
    } as unknown as GetTalk
    const endpoint = new GetTalkEndpoint(getTalkUseCase)

    const talk = await endpoint.execute(API_TALK.id)

    expect(talk.id).toEqual(API_TALK.id)
    expect(talk.title).toEqual(API_TALK.title)
    expect(talk.description).toEqual(API_TALK.description)
    expect(talk.language).toEqual(API_TALK.language)
    expect(talk.cospeakers).toEqual(API_TALK.cospeakers)
    expect(talk.status).toEqual('PROPOSAL')
    expect(talk.speakerId).toEqual(JOYCE_LIN.id)
    expect(talk.eventId).toEqual(CODEMOTION.id)
  })
})
