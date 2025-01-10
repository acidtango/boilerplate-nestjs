import { z } from '../../../../shared/infrastructure/controllers/zod.ts'
import { JSDAY_CANARIAS } from '../../../../shared/infrastructure/fixtures/events.ts'

export const ProposalDateRangeDTO = z
  .object({
    startDate: z.string().openapi({ example: JSDAY_CANARIAS.proposalsStartDate.toISOString() }),
    deadline: z.string().openapi({ example: JSDAY_CANARIAS.proposalsDeadlineDate.toISOString() }),
  })
  .openapi('ProposalDateRangeDTO')
