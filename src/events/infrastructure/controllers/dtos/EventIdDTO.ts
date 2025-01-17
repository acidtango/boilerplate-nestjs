import { z } from '../../../../shared/infrastructure/controllers/zod.ts'
import { JSDAY_CANARIAS } from '../../../../shared/infrastructure/fixtures/events.ts'

export const EventIdDTO = z.string().uuid().openapi({
  ref: 'EventId',
  description:
    'A unique identifier for an event in the Codetalk platform. This is a string formatted as a UUID, used to reference the event across the system and ensure accurate association with sessions, speakers, and other related entities.',
  example: JSDAY_CANARIAS.id,
})
