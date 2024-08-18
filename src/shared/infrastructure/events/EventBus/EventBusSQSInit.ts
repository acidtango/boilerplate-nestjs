import { EventBusSQS } from './EventBusSQS'

// eslint-disable-next-line
const eventBus = new EventBusSQS(null as any)
eventBus.createQueue()
