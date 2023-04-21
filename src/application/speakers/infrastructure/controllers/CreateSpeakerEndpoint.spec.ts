import { JOYCE_LIN } from '../../../../shared/fixtures/speakers'
import { EmailAddress } from '../../../shared/domain/EmailAddress'
import { SpeakerAge } from '../../domain/SpeakerAge'
import { SpeakerId } from '../../../../shared/domain/ids/SpeakerId'
import { SpeakerName } from '../../domain/SpeakerName'
import { CreateSpeaker } from '../../use-cases/CreateSpeaker'
import { CreateSpeakerEndpoint } from './CreateSpeakerEndpoint'
import { CreateSpeakerRequestDTO } from './dtos/CreateSpeakerRequestDTO'

describe('CreateSpeakerEndpoint', () => {
  it('transforms DTO into domain objects', async () => {
    const createSpeakerUseCase = { execute: jest.fn() } as unknown as CreateSpeaker
    const endpoint = new CreateSpeakerEndpoint(createSpeakerUseCase)
    const createSpeakerDTO = CreateSpeakerRequestDTO.create({
      id: JOYCE_LIN.id,
      name: JOYCE_LIN.name,
      age: JOYCE_LIN.age,
      email: JOYCE_LIN.email,
      language: JOYCE_LIN.language,
    })

    await endpoint.execute(createSpeakerDTO)

    expect(createSpeakerUseCase.execute).toHaveBeenCalledWith({
      id: SpeakerId.fromPrimitives(JOYCE_LIN.id),
      name: SpeakerName.fromPrimitives(JOYCE_LIN.name),
      age: SpeakerAge.fromPrimitives(JOYCE_LIN.age),
      email: EmailAddress.fromPrimitives(JOYCE_LIN.email),
      language: JOYCE_LIN.language,
    })
  })
})
