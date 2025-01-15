import { JUNIOR_XP } from '../../../../shared/infrastructure/fixtures/talks.ts'
import { Language } from '../../../../shared/domain/models/Language.ts'
import { CONCHA_ASENSIO } from '../../../../shared/infrastructure/fixtures/speakers.ts'
import { JSDAY_CANARIAS } from '../../../../shared/infrastructure/fixtures/events.ts'
import { z } from '../../../../shared/infrastructure/controllers/zod.ts'

export const ProposeTalkRequestDTO = z
  .object({
    id: z.string().uuid().openapi({ example: JUNIOR_XP.id }),
    title: z.string().openapi({ example: JUNIOR_XP.title }),
    description: z.string().openapi({ example: JUNIOR_XP.description }),
    language: z.nativeEnum(Language).openapi({ example: Language.ENGLISH }),
    cospeakers: z.array(z.string()).openapi({ example: JUNIOR_XP.cospeakers }),
    speakerId: z.string().uuid().openapi({ example: CONCHA_ASENSIO.id }),
    eventId: z.string().uuid().openapi({ example: JSDAY_CANARIAS.id }),
  })
  .openapi('ProposeTalkRequestDTO')
