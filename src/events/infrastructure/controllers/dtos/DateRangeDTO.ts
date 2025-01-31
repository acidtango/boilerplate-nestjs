import { z } from '../../../../shared/infrastructure/controllers/zod.ts'
import { JSDAY_CANARIAS } from '../../../../shared/infrastructure/fixtures/events.ts'

export const DateRangeDTO = z
  .object({
    startDate: z.coerce.date().openapi({
      description:
        "The date when the event begins. It defines the starting point of the event's duration.",
      format: 'date-time',
      example: JSDAY_CANARIAS.startDate.toISOString(),
    }),
    endDate: z.coerce.date().openapi({
      description:
        "The date when the event ends. It defines the concluding point of the event's duration and must be on or after the startDate.",
      format: 'date-time',
      example: JSDAY_CANARIAS.endDate.toISOString(),
    }),
  })
  .openapi({
    ref: 'DateRange',
    description: 'An object representing the start and end dates of an event.',
  })
