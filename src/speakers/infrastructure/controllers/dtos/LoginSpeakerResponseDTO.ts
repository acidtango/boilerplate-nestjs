import { z } from '../../../../shared/infrastructure/controllers/zod.ts'
import { CONCHA_ASENSIO } from '../../../../shared/infrastructure/fixtures/speakers.ts'

export const LoginSpeakerResponseDTO = z
  .object({
    accessToken: z.string().openapi({ example: CONCHA_ASENSIO.jwt }),
  })
  .openapi({
    ref: 'LoginSpeakerResponseDTO',
    description: 'TODO',
  })
