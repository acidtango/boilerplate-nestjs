import { OpenAPIHono } from '@hono/zod-openapi'
import { container } from './container.ts'
import { Token } from './shared/domain/services/Token.ts'

export const app = await container.getAsync<OpenAPIHono>(Token.APP)
