import { z } from '../../../../shared/infrastructure/controllers/zod.ts'
import { CONCHA_ASENSIO } from '../../../../shared/infrastructure/fixtures/speakers.ts'
import { Language } from '../../../../shared/domain/models/Language.ts'

export const SpeakerProfileDTO = z.object({
  name: z.string().openapi({ example: CONCHA_ASENSIO.name }),
  age: z.number().int().positive().openapi({ example: CONCHA_ASENSIO.age }),
  language: z.nativeEnum(Language).openapi({ example: CONCHA_ASENSIO.language }),
})
