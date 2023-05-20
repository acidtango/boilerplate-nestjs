import { PhoneValidator } from '../../src/codetalk/shared/domain/services/PhoneValidator'
import { CustomHealthIndicator } from '../../src/codetalk/shared/infrastructure/services/CustomHealthIndicator'
import { EventRepositoryMemory } from '../../src/codetalk/events/infrastructure/repositories/EventRepositoryMemory'

type Dependencies = {
  databaseHealthIndicator?: CustomHealthIndicator
  phoneValidator?: PhoneValidator
}

type Repositories = {
  eventRepository?: EventRepositoryMemory
}

export type AllDependencies = Dependencies & Repositories
