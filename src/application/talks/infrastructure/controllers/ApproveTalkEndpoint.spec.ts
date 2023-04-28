import { API_TALK } from '../../../../shared/fixtures/talks'
import { ApproveTalk } from '../../use-cases/ApproveTalk'
import { ApproveTalkEndpoint } from './ApproveTalkEndpoint'

describe('ApproveTalkEndpoint', () => {
  it('transforms DTO into domain objects', async () => {
    const approveTalk = { execute: jest.fn() } as unknown as ApproveTalk
    const endpoint = new ApproveTalkEndpoint(approveTalk)

    await endpoint.execute(API_TALK.id)

    expect(approveTalk.execute).toHaveBeenCalledWith(API_TALK.id)
  })
})
