// import { EventRepositoryMongo } from './EventRepositoryMongo.ts'
import { EventRepositoryMemory } from './EventRepositoryMemory.ts'
import type { Reseteable } from '../../../shared/infrastructure/repositories/Reseteable.ts'
import type { EventRepository } from '../../domain/repositories/EventRepository.ts'
import { jsdayEvent, jsdayId } from '../../../../test/mother/EventMother/JsDay.ts'
import { codemotionEvent } from '../../../../test/mother/EventMother/Codemotion.ts'
import { after, before, beforeEach, describe, it } from 'node:test'
import { expect } from 'expect'

describe('TalkEventRepository', () => {
  const classes = [EventRepositoryMemory]
  classes.forEach((repositoryClass) => {
    describe(repositoryClass.name, () => {
      let talkEventRepository: EventRepository & Reseteable

      before(async () => {
        talkEventRepository = new repositoryClass()
      })

      beforeEach(async () => {
        await talkEventRepository.reset()
      })

      after(async () => {
        // TODO: close connections
      })

      it('saves the event', async () => {
        const talkEventId = jsdayId()
        const talkEvent = jsdayEvent({ id: talkEventId })

        await talkEventRepository.save(talkEvent)

        const result = await talkEventRepository.exists(talkEventId)
        expect(result).toEqual(true)
      })

      it('retrieves all events', async () => {
        const canariasJSTalkEvent = jsdayEvent()
        const codemotionTalkEvent = codemotionEvent()

        await talkEventRepository.save(canariasJSTalkEvent)
        await talkEventRepository.save(codemotionTalkEvent)

        const allEvents = await talkEventRepository.findAll()

        expect(allEvents).toHaveLength(2)
      })

      it('find retrieves the saved event', async () => {
        const event = jsdayEvent()

        await talkEventRepository.save(event)

        const [storedEvent] = await talkEventRepository.findAll()

        expect(storedEvent).toEqual(event)
      })
    })
  })
})
