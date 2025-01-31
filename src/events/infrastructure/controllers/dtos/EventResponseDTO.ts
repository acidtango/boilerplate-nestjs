import { z } from '../../../../shared/infrastructure/controllers/zod.ts'
import { JSDAY_CANARIAS } from '../../../../shared/infrastructure/fixtures/events.ts'
import { DateRangeDTO } from './DateRangeDTO.ts'
import { ProposalDateRangeDTO } from './ProposalDateRangeDTO.ts'

export const EventResponseDTO = z
  .object({
    id: z.string().openapi({ example: JSDAY_CANARIAS.id }),
    name: z.string().openapi({ example: JSDAY_CANARIAS.name }),
    dateRange: DateRangeDTO,
    proposalsDateRange: ProposalDateRangeDTO,
  })
  .openapi({
    ref: 'EventResponse',
    description:
      "Represents the detailed information of an event in the Codetalk platform. This includes the event's unique identifier, name, duration, and the time frame during which proposals can be submitted. It serves as the response structure for endpoints that provide event data.",
  })
