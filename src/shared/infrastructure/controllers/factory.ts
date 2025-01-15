import { createFactory } from 'hono/factory'

export const factory = createFactory()

export type Endpoint = {
  method: 'put' | 'get' | 'post' | 'delete'
  path: string
  handlers: Array<any>
}
