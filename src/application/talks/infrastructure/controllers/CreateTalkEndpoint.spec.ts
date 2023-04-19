import { API_TALK } from '../../../../shared/fixtures/talks'
import { TalkDescription } from '../../domain/TalkDescription'
import { TalkId } from '../../domain/TalkId'
import { TalkTitle } from '../../domain/TalkTitle'

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
    })

    await endpoint.execute(createTalkDTO)

    expect(createTalkUseCase.execute).toHaveBeenCalledWith({
      id: TalkId.fromPrimitives(API_TALK.id),
      title: TalkTitle.fromPrimitives(API_TALK.title),
      description: TalkDescription.fromPrimitives(API_TALK.description),
      cospeakers: API_TALK.cospeakers,
      language: API_TALK.language,
    })
  })
})
