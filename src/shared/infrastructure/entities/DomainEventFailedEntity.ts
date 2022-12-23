import { Column, Entity, PrimaryColumn } from 'typeorm'
import { ActorPrimitives } from '../../domain/Actor'
import { DomainEvent } from '../../domain/events/DomainEvent'
import { DomainEventSubscriber } from '../../domain/events/DomainEventSubscriber'

@Entity({ name: 'domain_events_failed' })
export class DomainEventFailedEntity {
  @PrimaryColumn({ type: 'uuid' })
  eventId!: string

  @Column()
  eventName!: string

  @Column()
  aggregateId!: string

  @Column({ type: 'timestamptz' })
  ocurredAt!: Date

  @Column({ type: 'jsonb' })
  actor!: ActorPrimitives

  @Column()
  subscriber!: string

  @Column({ nullable: true })
  failReason?: string

  @Column({ type: 'jsonb' })
  payload!: Record<string, unknown>

  static fromDomain(
    domainEvent: DomainEvent,
    subscriber: DomainEventSubscriber<DomainEvent>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    failReason: any
  ) {
    const { eventId, aggregateId, eventName, occurredAt, actor, ...payload } =
      domainEvent.toPrimitives()
    const entity = new DomainEventFailedEntity()

    entity.eventId = eventId
    entity.aggregateId = aggregateId
    entity.eventName = eventName
    entity.ocurredAt = occurredAt
    entity.failReason = failReason
    entity.actor = actor
    entity.subscriber = subscriber.constructor.name

    entity.payload = payload

    return entity
  }
}
