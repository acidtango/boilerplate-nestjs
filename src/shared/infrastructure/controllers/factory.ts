import { createFactory } from 'hono/factory'

export const factory = createFactory()

export type Endpoint = {
  method: 'put' | 'get' | 'post' | 'delete'
  path: string
  // biome-ignore lint/suspicious/noExplicitAny: handler signatures vary per route, no shared type covers them all
  handlers: Array<any>
  secured?: boolean
}
