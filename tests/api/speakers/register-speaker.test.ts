import { describe, it, beforeEach } from "node:test";
import { expect } from "expect";
import * as jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { CONCHA_ASENSIO } from "../../../src/shared/infrastructure/fixtures/speakers.ts";
import { createClient } from "../../utils/TestClient.ts";

beforeEach(async () => {
  const client = await createClient();
  await client.reset();
});

describe("register speaker", () => {
  it("registers the user and then can login", async () => {
    const client = await createClient();

    await client.registerSpeaker();

    const { status } = await client.loginSpeaker();
    expect(status).toBe(200);
  });

  it("login returns a refresh token", async () => {
    const client = await createClient();
    const clock = client.getClock();
    const now = clock.now();
    const expectedIat = now.toSeconds();
    const expectedExp = now.addDays(1).toSeconds();
    await client.registerSpeaker();

    const { body } = await client.loginSpeaker();

    const content = jwt.decode(body.accessToken) as JwtPayload;
    expect(content.sub).toEqual(CONCHA_ASENSIO.id);
    expect(content.iat).toEqual(expectedIat);
    expect(content.exp).toEqual(expectedExp);
  });
});
