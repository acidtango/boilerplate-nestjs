import { EventBusSQS } from '../../src/shared/infrastructure/events/EventBus/EventBusSQS'
import { TestApi } from '../utils/TestApi'

afterAll(async () => {
  const testApi = await TestApi.create()
  await testApi.close()
})

afterEach(async () => {
  const testApi = await TestApi.create()
  const eventBus = testApi.getEventBus()

  if (eventBus instanceof EventBusSQS) {
    await eventBus.waitForProcessingAllEvents()
  }
})
