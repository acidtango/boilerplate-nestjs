import { GetSpeakerEndpoint } from './GetSpeakerEndpoint'
import { GetSpeaker } from '../../use-cases/GetSpeaker'
import { createJoyceLinId, createJoyceLinSpeaker } from '../../../../../test/mother/SpeakerMother'
import { JOYCE_LIN } from '../../../../shared/fixtures/speakers'

describe('ListEventsEndpoint', () => {
  it('calls the use case with the given id', () => {
    const listEventUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(createJoyceLinSpeaker())),
    } as unknown as GetSpeaker
    const endpoint = new GetSpeakerEndpoint(listEventUseCase)

    endpoint.execute(JOYCE_LIN.id)

    expect(listEventUseCase.execute).toHaveBeenCalledWith(createJoyceLinId())
  })

  it('serializes the speaker if exists', async () => {
    const listEventUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(createJoyceLinSpeaker())),
    } as unknown as GetSpeaker
    const endpoint = new GetSpeakerEndpoint(listEventUseCase)

    const speaker = await endpoint.execute(JOYCE_LIN.id)

    expect(speaker.id).toEqual(JOYCE_LIN.id)
    expect(speaker.name).toEqual(JOYCE_LIN.name)
    expect(speaker.age).toEqual(JOYCE_LIN.age)
    expect(speaker.language).toEqual(JOYCE_LIN.language)
    expect(speaker.email).toEqual(JOYCE_LIN.email)
    expect(speaker.isEmailValidated).toEqual(true)
  })
})
