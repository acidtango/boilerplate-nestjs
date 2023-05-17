import { TalkId } from '../../../../shared/domain/ids/TalkId'
import { API_TALK } from '../../../../shared/fixtures/talks'
import { ApproveTalk } from '../../use-cases/ApproveTalk'
import { ApproveTalkEndpoint } from './ApproveTalkEndpoint'

describe('ApproveTalkEndpoint', () => {
  it('transforms DTO into domain objects', async () => {
    const approveTalk = { execute: jest.fn() } as unknown as ApproveTalk
    const endpoint = new ApproveTalkEndpoint(approveTalk)

    await endpoint.execute(API_TALK.id)

    expect(approveTalk.execute).toHaveBeenCalledWith(TalkId.fromPrimitives(API_TALK.id))
  })
})
