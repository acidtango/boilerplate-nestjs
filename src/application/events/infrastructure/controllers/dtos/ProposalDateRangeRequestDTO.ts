import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDate } from 'class-validator'
import { CODEMOTION } from '../../../../../shared/fixtures/events'

export class ProposalDateRangeRequestDTO {
  @ApiProperty({ example: CODEMOTION.proposalsStartDate })
  @IsDate()
  @Type(() => Date)
  startDate!: Date

  @ApiProperty({ example: CODEMOTION.proposalsDeadlineDate })
  @IsDate()
  @Type(() => Date)
  deadline!: Date

  static create(startDate: Date, deadline: Date) {
    const proposalDateRangeRequestDTO = new ProposalDateRangeRequestDTO()
    proposalDateRangeRequestDTO.startDate = startDate
    proposalDateRangeRequestDTO.deadline = deadline
    return proposalDateRangeRequestDTO
  }
}
