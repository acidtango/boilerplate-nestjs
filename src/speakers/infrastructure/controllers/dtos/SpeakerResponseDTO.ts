import { z } from '../../../../shared/infrastructure/controllers/zod.ts'
import { CONCHA_ASENSIO } from '../../../../shared/infrastructure/fixtures/speakers.ts'
import { SpeakerProfileDTO } from './SpeakerProfileDTO.ts'

export const SpeakerResponseDTO = z.object({
  id: z.string().uuid().openapi({ example: CONCHA_ASENSIO.id }),
  email: z.string().email().openapi({ example: CONCHA_ASENSIO.email }),
  isEmailValidated: z.boolean().openapi({ example: true }),
  profile: SpeakerProfileDTO.optional(),
})
