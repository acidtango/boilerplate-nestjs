import type { DomainEventClass } from "./DomainEvent.ts";

export const EVENT_HANDLER_METADATA = "EventHandlerMetadata";

export type HandleEventMetadata = {
  event: DomainEventClass;
};
