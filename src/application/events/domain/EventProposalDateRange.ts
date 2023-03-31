import { ValueObject } from '../../../shared/domain/hex/ValueObject'

type EventProposalDateRangePrimitives = { startDate: Date; deadline: Date }
export class EventProposalDateRange extends ValueObject {
  constructor(private readonly startDate: Date, private readonly deadline: Date) {
    super()
  }

  static fromPrimitives({
    startDate,
    deadline,
  }: EventProposalDateRangePrimitives): EventProposalDateRange {
    return new EventProposalDateRange(startDate, deadline)
  }

  toPrimitives(): EventProposalDateRangePrimitives {
    return { startDate: this.startDate, deadline: this.deadline }
  }
}
