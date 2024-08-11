import { describe, it } from "node:test";
import { expect } from "expect";
import { SpeakerAge } from "./SpeakerAge.ts";
import { UnderageSpeakerError } from "../errors/UnderageSpeakerError.ts";

describe("SpeakerAge", () => {
  it("does not fail if user is not under-age", () => {
    expect(() => new SpeakerAge(18)).not.toThrow();
  });

  it("fails if user is under-age", () => {
    const underageSpeakerError = new UnderageSpeakerError(12);
    expect(() => new SpeakerAge(12)).toThrowError(underageSpeakerError);
  });
});
