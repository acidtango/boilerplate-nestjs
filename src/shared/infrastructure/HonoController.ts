import type { OpenAPIHono } from "@hono/zod-openapi";

export interface HonoController {
  register(api: OpenAPIHono): void;
}
