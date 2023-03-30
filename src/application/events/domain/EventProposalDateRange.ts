import { ValueObject } from '../../../shared/domain/hex/ValueObject'

export class EventProposalDateRange extends ValueObject {
  static fromPrimitives(
    proposalsStartDate: string,
    proposalsDeadlineDate: string
  ): EventProposalDateRange {
    throw new Error('Method not implemented.')
  }
}
