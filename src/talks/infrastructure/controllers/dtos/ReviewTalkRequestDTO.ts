import { z } from '../../../../shared/infrastructure/controllers/zod.ts'
import { DAILOS } from '../../../../shared/infrastructure/fixtures/organizers.ts'

export const ReviewTalkRequestDTO = z.object({
  reviewerId: z.string().uuid().openapi({ example: DAILOS.id }),
})
