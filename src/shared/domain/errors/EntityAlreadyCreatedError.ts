import { DomainId } from '../hex/DomainId'
import { DomainError } from './DomainError'
import { DomainErrorCode } from './DomainErrorCode'

export class EntityAlreadyCreatedError extends DomainError {
  constructor(domainId: DomainId, entityName: string) {
    super(
      `Entity of type ${entityName} with id ${domainId} already exists.`,
      DomainErrorCode.ENTITY_ALREADY_CREATED_ERROR
    )
  }
}
