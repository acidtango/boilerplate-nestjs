import { z } from '../../../../shared/infrastructure/controllers/zod.ts'
import { CONCHA_ASENSIO } from '../../../../shared/infrastructure/fixtures/speakers.ts'

export const RegisterSpeakerRequestDTO = z
  .object({
    id: z.string().uuid().openapi({ example: CONCHA_ASENSIO.id }),
    email: z.string().email().openapi({ example: CONCHA_ASENSIO.email }),
    password: z.string().openapi({ example: CONCHA_ASENSIO.password }),
  })
  .openapi({
    ref: 'RegisterSpeakerRequestDTO',
    description: 'TODO',
  })
