import { EventBus } from '../../domain/hex/EventBus'

export class EventBusNoop implements EventBus {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async publish(): Promise<void> {}
}
