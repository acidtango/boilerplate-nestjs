import { TalkRepositoryMemory } from './TalkRepositoryMemory'
import { createApiTalk, createApiTalkId } from '../../../../../test/mother/TalkMother'

describe('TalkRepositoryMemory', () => {
  let talkRepository: TalkRepositoryMemory

  beforeEach(() => {
    talkRepository = new TalkRepositoryMemory()
  })

  it('saves the talk', async () => {
    const talkId = createApiTalkId()
    const talk = createApiTalk({ id: talkId })

    await talkRepository.save(talk)

    const savedTalk = await talkRepository.findById(talkId)
    expect(savedTalk).toEqual(talk)
  })

  it('findById returns undefined if not found', async () => {
    const notExistentId = createApiTalkId()

    const notExistentTalk = await talkRepository.findById(notExistentId)

    expect(notExistentTalk).toBeUndefined()
  })

  //
  // it('checks if the speaker exists', async () => {
  //     const speakerId = new SpeakerId(JOYCE_LIN.id)
  //     const speaker = createJoyceLinSpeaker({ id: speakerId })
  //     await talkRepository.save(speaker)
  //
  //     const exists = await talkRepository.exists(speakerId)
  //
  //     expect(exists).toBe(true)
  // })
})
