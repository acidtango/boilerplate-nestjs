import { z } from '../../../../shared/infrastructure/controllers/zod.ts'
import { JSDAY_CANARIAS } from '../../../../shared/infrastructure/fixtures/events.ts'

export const EventNameDTO = z.string().openapi({
  ref: 'EventName',
  description:
    'The name of the event in the Codetalk platform. This is a descriptive string that identifies the event and is typically displayed in user interfaces and communications',
  example: JSDAY_CANARIAS.name,
})
