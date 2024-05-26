import { EventBus } from '../../../domain/models/hex/EventBus'

export class EventBusNoop implements EventBus {
  async publish(): Promise<void> {}
}
