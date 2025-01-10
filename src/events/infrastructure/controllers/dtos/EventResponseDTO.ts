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
  .openapi('EventResponseDTO')
