import { randomUUID } from "node:crypto";
import type { UuidGenerator } from "../../../domain/services/UuidGenerator.ts";

export class UuidGeneratorRandom implements UuidGenerator {
  public static generate(): string {
    return randomUUID();
  }

  generate(): string {
    return UuidGeneratorRandom.generate();
  }
}
