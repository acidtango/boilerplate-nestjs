import { DomainId } from '../models/hex/DomainId'
import { DomainError } from './DomainError'
import { DomainErrorCode } from './DomainErrorCode'

export class AggregateAlreadyCreatedError extends DomainError {
  constructor(domainId: DomainId, entityName: string) {
    super(
      `Aggregate of type ${entityName} with id ${domainId} already exists.`,
      DomainErrorCode.AGGREGATE_ALREADY_CREATED_ERROR
    )
  }
}
