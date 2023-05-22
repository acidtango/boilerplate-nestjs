import { TestApi } from '../utils/TestApi'
import { EventBusRabbitMQ } from '../../src/shared/infrastructure/events/EventBus/EventBusRabbitMQ'

afterAll(async () => {
  const testApi = await TestApi.create()
  await testApi.close()
})

afterEach(async () => {
  const testApi = await TestApi.create()
  const eventBus = testApi.getEventBus()

  if (eventBus instanceof EventBusRabbitMQ) {
    await eventBus.waitForProcessingAllEvents()
  }
})
