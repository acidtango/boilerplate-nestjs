import { EventId } from '../../../src/shared/domain/models/ids/EventId.ts'

export function nonExistingEventId() {
  return new EventId('non-existing-event-id')
}
