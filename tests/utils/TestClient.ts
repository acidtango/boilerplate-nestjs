import type { OpenAPIHono } from "@hono/zod-openapi";
import { expect } from "expect";
import type { Container } from "inversify";
import { container } from "../../src/container.ts";
import type { Clock } from "../../src/shared/domain/services/Clock.ts";
import { CONCHA_ASENSIO } from "../../src/shared/infrastructure/fixtures/speakers.ts";
import { Token } from "../../src/shared/domain/services/Token.ts";
import {
  isReseteable,
  type Reseteable,
} from "../../src/shared/infrastructure/repositories/Reseteable.ts";

class TestClient {
  private readonly container: Container;

  constructor(container: Container) {
    this.container = container;
  }

  get app() {
    return this.container.get<OpenAPIHono>(Token.APP);
  }

  getClock() {
    return this.container.get<Clock>(Token.CLOCK);
  }

  async reset() {
    const repositories = [
      this.container.get<Reseteable>(Token.SPEAKER_REPOSITORY),
    ].filter(isReseteable);

    for (const repository of repositories) {
      await repository.reset();
    }
  }

  async registerSpeaker() {
    const res = await this.app.request("/api/v1/speakers/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: CONCHA_ASENSIO.id,
        email: CONCHA_ASENSIO.email,
        password: CONCHA_ASENSIO.password,
      }),
    });
    expect(res.status).toBe(201);
    return {
      status: res.status,
      res,
    };
  }

  async loginSpeaker() {
    const res = await this.app.request("/api/v1/speakers/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: CONCHA_ASENSIO.email,
        password: CONCHA_ASENSIO.password,
      }),
    });
    expect(res.status).toBe(200);
    return {
      status: res.status,
      body: await res.json(),
      res,
    };
  }
}

export async function createClient() {
  return new TestClient(container);
}
