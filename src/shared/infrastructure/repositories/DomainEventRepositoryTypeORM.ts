import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { DomainEvent } from '../../domain/events/DomainEvent'
import { DomainEventSubscriber } from '../../domain/events/DomainEventSubscriber'
import { DomainEventFailedEntity } from '../entities/DomainEventFailedEntity'
import { DomainEventSucceedEntity } from '../entities/DomainEventSucceedEntity'

@Injectable()
export class DomainEventRepositoryTypeORM {
  private domainEventSucceedRepository: Repository<DomainEventSucceedEntity>

  private domainEventFailedRepository: Repository<DomainEventFailedEntity>

  constructor(private readonly dataSource: DataSource) {
    this.domainEventSucceedRepository = this.dataSource.getRepository(DomainEventSucceedEntity)
    this.domainEventFailedRepository = this.dataSource.getRepository(DomainEventFailedEntity)
  }

  async saveSucceed(
    event: DomainEvent,
    subscriber: DomainEventSubscriber<DomainEvent>
  ): Promise<void> {
    await this.domainEventSucceedRepository.save(
      DomainEventSucceedEntity.fromDomain(event, subscriber)
    )
  }

  async saveFailed(
    event: DomainEvent,
    subscriber: DomainEventSubscriber<DomainEvent>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any
  ): Promise<void> {
    await this.domainEventFailedRepository.save(
      DomainEventFailedEntity.fromDomain(event, subscriber, error)
    )
  }
}
