import { IncomingMessage } from 'http'
import { VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import morgan from 'morgan'
import { MainModule } from './MainModule'
import { config } from './shared/infrastructure/config'

async function bootstrap() {
  const app = await NestFactory.create(MainModule)

  // Starts listening for shutdown hooks
  app.enableShutdownHooks()

  app.setGlobalPrefix(config.apiPrefix)
  app.enableVersioning({ type: VersioningType.URI })

  // Add Morgan for HTTP Logging
  const isHealthEndpoint = (req: IncomingMessage) => req.url === '/health'
  app.use(morgan('combined', { skip: isHealthEndpoint }))

  // Auto generated API documentation!!!
  const documentBuilder = new DocumentBuilder()
    .setTitle('CodeTalk')
    .setDescription('CodeTalk')
    .setVersion('1.0')
    .addBearerAuth()
  const options = documentBuilder.build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('docs', app, document)
  // Just run 'yarn start' and visit http://localhost:8080/docs
  // To generate and download a Swagger JSON file, go to http://localhost:8080/docs-json
  if (!config.testModeEnabled) {
    // app.useLogger(app.get(Logger))
  }

  await app.listen(config.listeningPort)
}
bootstrap()
