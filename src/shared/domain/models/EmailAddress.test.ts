import { describe, it } from "node:test";
import { expect } from "expect";
import { EmailAddress } from "./EmailAddress.ts";

describe("EmailAddress", () => {
  it("can be converted to string", () => {
    const emailString = "someone@example.com";
    const email = new EmailAddress(emailString);

    const asString = `${email}`;

    expect(asString).toEqual(emailString);
  });
});
