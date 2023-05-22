import { EventBus } from '../../../domain/models/hex/EventBus'

export class EventBusNoop implements EventBus {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async publish(): Promise<void> {}
}
