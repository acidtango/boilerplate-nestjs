import { z } from '@hono/zod-openapi'
import { JSDAY_CANARIAS } from '../../../../shared/infrastructure/fixtures/events.ts'

export const DateRangeDTO = z
  .object({
    startDate: z.string().openapi({ example: JSDAY_CANARIAS.startDate.toISOString() }),
    endDate: z.string().openapi({ example: JSDAY_CANARIAS.endDate.toISOString() }),
  })
  .openapi('DateRangeDTO')
