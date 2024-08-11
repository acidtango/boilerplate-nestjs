import { createRoute, OpenAPIHono, type RouteConfig } from "@hono/zod-openapi";
import type { interfaces } from "inversify";
import { RegisterSpeaker } from "../use-cases/RegisterSpeaker.ts";
import type { HonoController } from "../../shared/infrastructure/HonoController.ts";
import { RegisterSpeakerRequestDTO } from "./dtos/RegisterSpeakerRequestDTO.ts";
import { EmailAddress } from "../../shared/domain/models/EmailAddress.ts";
import { SpeakerId } from "../../shared/domain/models/ids/SpeakerId.ts";
import { PlainPassword } from "../../shared/domain/models/PlainPassword.ts";

export class RegisterSpeakerController implements HonoController {
  private static Schema = {
    method: "post",
    path: "/api/v1/speakers/registration",
    request: {
      body: {
        content: {
          "application/json": {
            schema: RegisterSpeakerRequestDTO,
          },
        },
      },
    },
    responses: {
      201: {
        description: "Speaker registered",
      },
    },
  } satisfies RouteConfig;

  public static create({ container }: interfaces.Context) {
    return new RegisterSpeakerController(container.get(RegisterSpeaker));
  }

  private readonly registerSpeaker: RegisterSpeaker;

  constructor(registerSpeaker: RegisterSpeaker) {
    this.registerSpeaker = registerSpeaker;
  }

  register(api: OpenAPIHono) {
    api.openapi(createRoute(RegisterSpeakerController.Schema), async (c) => {
      const body = c.req.valid("json");
      await this.registerSpeaker.execute({
        id: SpeakerId.fromPrimitives(body.id),
        email: EmailAddress.fromPrimitives(body.email),
        password: PlainPassword.fromPrimitives(body.password),
      });
      return c.body(null, 201);
    });
  }
}
