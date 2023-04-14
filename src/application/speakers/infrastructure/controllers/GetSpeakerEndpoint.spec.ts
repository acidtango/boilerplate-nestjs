import { GetSpeakerEndpoint } from './GetSpeakerEndpoint'
import { GetSpeaker } from '../../use-cases/GetSpeaker'
import { createJoyceLinSpeaker } from '../../../../../test/mother/SpeakerMother'
import { JOYCE_LIN } from '../../../../shared/fixtures/speakers'

describe('ListEventsEndpoint', () => {
  it('serializes the speaker if exists', async () => {
    const listEventUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(createJoyceLinSpeaker())),
    } as unknown as GetSpeaker
    const endpoint = new GetSpeakerEndpoint(listEventUseCase)

    const speaker = await endpoint.execute()

    expect(speaker.id).toEqual(JOYCE_LIN.id)
    expect(speaker.name).toEqual(JOYCE_LIN.name)
    expect(speaker.age).toEqual(JOYCE_LIN.age)
    expect(speaker.language).toEqual(JOYCE_LIN.language)
    expect(speaker.email).toEqual(JOYCE_LIN.email)
    expect(speaker.isEmailValidated).toEqual(true)
  })
})
