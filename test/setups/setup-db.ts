import { SQSQueueEventBus } from '../../src/shared/infrastructure/events/EventBus/SQSQueueEventBus'
import { TestApi } from '../utils/TestApi'

afterAll(async () => {
  const testApi = await TestApi.create()
  await testApi.close()
})

afterEach(async () => {
  const testApi = await TestApi.create()
  const eventBus = testApi.getEventBus()

  if (eventBus instanceof SQSQueueEventBus) {
    await eventBus.waitForProcessingAllEvents()
  }
})
