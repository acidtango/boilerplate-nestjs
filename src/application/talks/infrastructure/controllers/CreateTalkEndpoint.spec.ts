import { CODEMOTION } from '../../../../shared/fixtures/events'
import { JOYCE_LIN } from '../../../../shared/fixtures/speakers'
import { API_TALK } from '../../../../shared/fixtures/talks'

import { CreateTalk } from '../../use-cases/CreateTalk'
import { CreateTalkEndpoint } from './CreateTalkEndpoint'
import { CreateTalkRequestDTO } from './dtos/CreateTalkRequestDTO'

describe('CreateTalkEndpoint', () => {
  it('transforms DTO into domain objects', async () => {
    const createTalkUseCase = { execute: jest.fn() } as unknown as CreateTalk
    const endpoint = new CreateTalkEndpoint(createTalkUseCase)
    const createTalkDTO = CreateTalkRequestDTO.create({
      id: API_TALK.id,
      title: API_TALK.title,
      description: API_TALK.description,
      cospeakers: API_TALK.cospeakers,
      language: API_TALK.language,
      eventId: CODEMOTION.id,
      speakerId: JOYCE_LIN.id,
    })

    await endpoint.execute(createTalkDTO)

    expect(createTalkUseCase.execute).toHaveBeenCalledWith({
      id: API_TALK.id,
      title: API_TALK.title,
      description: API_TALK.description,
      cospeakers: API_TALK.cospeakers,
      language: API_TALK.language,
      speakerId: JOYCE_LIN.id,
      eventId: CODEMOTION.id,
    })
  })
})
