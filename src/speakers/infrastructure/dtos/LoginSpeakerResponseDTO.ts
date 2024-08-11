import { z } from "@hono/zod-openapi";
import { CONCHA_ASENSIO } from "../../../shared/infrastructure/fixtures/speakers.ts";

export const LoginSpeakerResponseDTO = z
  .object({
    accessToken: z.string().openapi({ example: CONCHA_ASENSIO.jwt }),
  })
  .openapi("LoginSpeakerResponseDTO");
