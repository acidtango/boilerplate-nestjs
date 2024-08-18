import { EventBusSQS } from './shared/infrastructure/events/EventBus/EventBusSQS'

// eslint-disable-next-line
const eventBus = new EventBusSQS(null as any)
eventBus.createQueue()
