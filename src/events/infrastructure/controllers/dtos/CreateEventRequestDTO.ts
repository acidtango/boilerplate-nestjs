import { z } from '../../../../shared/infrastructure/controllers/zod.ts'
import { DateRangeDTO } from './DateRangeDTO.ts'
import { ProposalDateRangeDTO as ProposalDateRangeDTO } from './ProposalDateRangeDTO.ts'
import { JSDAY_CANARIAS } from '../../../../shared/infrastructure/fixtures/events.ts'

export const CreateEventRequestDTO = z
  .object({
    id: z.string().uuid().openapi({ example: JSDAY_CANARIAS.id }),
    name: z.string().openapi({ example: JSDAY_CANARIAS.name }),
    dateRange: DateRangeDTO,
    proposalsDateRange: ProposalDateRangeDTO,
  })
  .openapi('CreateEventRequestDTO')
