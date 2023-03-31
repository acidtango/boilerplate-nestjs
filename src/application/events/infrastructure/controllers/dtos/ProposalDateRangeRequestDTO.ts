import { ApiProperty } from '@nestjs/swagger'
import { IsDate } from 'class-validator'
import { CODEMOTION } from '../../../../../shared/fixtures/events'

export class ProposalDateRangeRequestDTO {
  @ApiProperty({ example: CODEMOTION.proposalsStartDate })
  @IsDate()
  startDate!: Date

  @ApiProperty({ example: CODEMOTION.proposalsDeadlineDate })
  @IsDate()
  deadline!: Date

  static create(startDate: Date, deadline: Date) {
    const proposalDateRangeRequestDTO = new ProposalDateRangeRequestDTO()
    proposalDateRangeRequestDTO.startDate = startDate
    proposalDateRangeRequestDTO.deadline = deadline
    return proposalDateRangeRequestDTO
  }
}
