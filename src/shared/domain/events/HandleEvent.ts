import { DomainEventClass } from './DomainEvent'
import { SetMetadata } from '@nestjs/common'

export const EVENT_HANDLER_METADATA = 'EventHandlerMetadata'

export type HandleEventMetadata = {
  event: DomainEventClass
}

export const HandleEvent = (event: DomainEventClass): MethodDecorator =>
  SetMetadata<string, HandleEventMetadata>(EVENT_HANDLER_METADATA, { event })
