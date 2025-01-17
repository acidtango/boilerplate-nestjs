import { z } from '../../../../shared/infrastructure/controllers/zod.ts'
import { JSDAY_CANARIAS } from '../../../../shared/infrastructure/fixtures/events.ts'

export const ProposalDateRangeDTO = z
  .object({
    startDate: z.coerce.date().openapi({
      description:
        'The date and time when proposal submissions open. This is formatted as an ISO 8601 string (e.g., YYYY-MM-DDTHH:mm:ssZ) and marks the beginning of the submission period.',
      format: 'date-time',
      example: JSDAY_CANARIAS.proposalsStartDate.toISOString(),
    }),
    deadline: z.coerce.date().openapi({
      description:
        'The date and time when proposal submissions close. This is formatted as an ISO 8601 string (e.g., YYYY-MM-DDTHH:mm:ssZ) and marks the end of the submission period.',
      format: 'date-time',
      example: JSDAY_CANARIAS.proposalsDeadlineDate.toISOString(),
    }),
  })
  .openapi({
    ref: 'ProposalDateRange',
    description:
      'Defines the time frame during which proposals can be submitted for an event. It includes the start date when submissions open and the deadline when submissions close. Both dates are formatted as ISO 8601 strings.  ',
  })
