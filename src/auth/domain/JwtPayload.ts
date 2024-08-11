import { Role } from "../../shared/domain/models/Role.ts";

export type JwtPayload = {
  sub: string;
  iat: number;
  exp: number;
  role: Role;
};
