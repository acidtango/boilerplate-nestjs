import type { interfaces } from 'inversify'
import { Hono } from 'hono'
import { containerMiddleware } from './ContainerMiddleware.ts'
import { Token } from '../../domain/services/Token.js'
import type { Endpoint } from './factory.js'

declare module 'hono' {
  interface ContextVariableMap {
    container: interfaces.Container
  }
}

export function createHono({ container }: interfaces.Context) {
  const app = new Hono()
  app.use(containerMiddleware(container))

  const endpoints = container.getAll<Endpoint>(Token.ENDPOINT)

  for (const endpoint of endpoints) {
    app[endpoint.method](endpoint.path, ...endpoint.handlers)
  }

  return app
}
