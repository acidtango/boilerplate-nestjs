import { describe, it } from "node:test";
import { expect } from "expect";
import { Speaker } from "./Speaker.ts";
import {
  notImportantEmail,
  notImportantPassword,
  notImportantSpeakerId,
} from "../../../../tests/mother/SpeakerMother/NotImportant.ts";
import { exampleSalt } from "../../../../tests/mother/Common.ts";
import {
  conchaAge,
  conchaLanguage,
  conchaName,
  conchaPassword,
} from "../../../../tests/mother/SpeakerMother/Concha.ts";
import { PlainPassword } from "../../../shared/domain/models/PlainPassword.ts";

describe("Speaker", () => {
  it("can check if the password is correct", () => {
    const password = conchaPassword();
    const speaker = Speaker.register(
      notImportantSpeakerId(),
      notImportantEmail(),
      password,
      exampleSalt()
    );

    const samePassword = speaker.has(password);

    expect(samePassword).toBe(true);
  });

  it("can check if the password is not correct", () => {
    const password = conchaPassword();
    const wrongPassword = new PlainPassword("wrong password");
    const speaker = Speaker.register(
      notImportantSpeakerId(),
      notImportantEmail(),
      password,
      exampleSalt()
    );

    const samePassword = speaker.has(wrongPassword);

    expect(samePassword).toBe(false);
  });

  it("checks if the name is correct", () => {
    const name = conchaName();
    const speaker = Speaker.register(
      notImportantSpeakerId(),
      notImportantEmail(),
      notImportantPassword(),
      exampleSalt()
    );

    const sameName = speaker.has(name);

    expect(sameName).toBe(false);
  });

  it("checks if the age is correct", () => {
    const age = conchaAge();
    const speaker = Speaker.register(
      notImportantSpeakerId(),
      notImportantEmail(),
      notImportantPassword(),
      exampleSalt()
    );

    const sameAge = speaker.has(age);

    expect(sameAge).toBe(false);
  });

  it("checks if the language is correct", () => {
    const language = conchaLanguage();
    const speaker = Speaker.register(
      notImportantSpeakerId(),
      notImportantEmail(),
      notImportantPassword(),
      exampleSalt()
    );

    const sameLanguage = speaker.has(language);

    expect(sameLanguage).toBe(false);
  });

  it("can update the profile", () => {
    const speaker = Speaker.register(
      notImportantSpeakerId(),
      notImportantEmail(),
      notImportantPassword(),
      exampleSalt()
    );
    const name = conchaName();
    const age = conchaAge();
    const language = conchaLanguage();

    speaker.updateProfile(name, age, language);

    expect(speaker.has(name)).toBe(true);
    expect(speaker.has(age)).toBe(true);
    expect(speaker.has(language)).toBe(true);
  });
});
