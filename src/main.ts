import { serve } from '@hono/node-server'
import { swaggerUI } from '@hono/swagger-ui'
import { openAPISpecs } from 'hono-openapi'
import { app } from './app.ts'

app.get('/ui', swaggerUI({ url: '/docs' }))

app.get(
  '/docs',
  openAPISpecs(app, {
    documentation: {
      info: {
        title: 'Hono API',
        version: '1.0.0',
        description: 'Greeting API',
      },
      servers: [{ url: 'http://localhost:3000', description: 'Local Server' }],
    },
  })
)

serve(app, (info) => {
  const url = `http://localhost:${info.port}`
  console.log(`Server listening on ${url}`)
  console.log(`Swagger Docs available at ${url}/docs`)
  console.log(`Swagger UI available at ${url}/ui`)
})
