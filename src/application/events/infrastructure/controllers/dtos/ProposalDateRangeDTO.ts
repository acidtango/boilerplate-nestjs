import { ApiProperty } from '@nestjs/swagger'
import { IsISO8601 } from 'class-validator'
import { CODEMOTION } from '../../../../../shared/fixtures/events'

export class ProposalDateRangeDTO {
  @ApiProperty({ example: CODEMOTION.proposalsStartDate, format: 'date-time' })
  @IsISO8601()
  startDate!: string

  @ApiProperty({ example: CODEMOTION.proposalsDeadlineDate, format: 'date-time' })
  @IsISO8601()
  deadline!: string

  static create(startDate: Date, deadline: Date) {
    const proposalDateRangeRequestDTO = new ProposalDateRangeDTO()
    proposalDateRangeRequestDTO.startDate = startDate.toISOString()
    proposalDateRangeRequestDTO.deadline = deadline.toISOString()
    return proposalDateRangeRequestDTO
  }
}
