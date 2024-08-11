import { ValueObject } from "./hex/ValueObject.ts";

export class EmailAddress extends ValueObject {
  private readonly email: string;

  constructor(email: string) {
    super();
    this.email = email;
  }

  static fromPrimitives(email: string): EmailAddress {
    return new EmailAddress(email);
  }

  toString() {
    return this.email;
  }

  toPrimitives() {
    return this.email;
  }
}
