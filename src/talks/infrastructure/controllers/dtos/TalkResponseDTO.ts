import { ApiProperty } from '@nestjs/swagger'
import { VLCTECHFEST } from '../../../../shared/infrastructure/fixtures/events'
import { CESAR } from '../../../../shared/infrastructure/fixtures/organizers'
import { PAOLA } from '../../../../shared/infrastructure/fixtures/speakers'
import { DISCOVERING_TECH_TALENT } from '../../../../shared/infrastructure/fixtures/talks'
import { Language } from '../../../../shared/domain/models/Language'
import { TalkStatus } from '../../../domain/models/TalkStatus'

export class TalkResponseDTO {
  @ApiProperty({ example: DISCOVERING_TECH_TALENT.id })
  id!: string

  @ApiProperty({ example: DISCOVERING_TECH_TALENT.title })
  title!: string

  @ApiProperty({ example: DISCOVERING_TECH_TALENT.description })
  description!: string

  @ApiProperty({ example: Language.ENGLISH, enum: Language })
  language!: Language

  @ApiProperty({ example: DISCOVERING_TECH_TALENT.cospeakers, type: [String] })
  cospeakers!: string[]

  @ApiProperty({ example: TalkStatus.PROPOSAL, enum: TalkStatus })
  status!: TalkStatus

  @ApiProperty({ example: PAOLA.id })
  speakerId!: string

  @ApiProperty({ example: CESAR.id, nullable: true })
  reviewerId?: string

  @ApiProperty({ example: false, nullable: true })
  isApproved?: boolean

  @ApiProperty({ example: VLCTECHFEST.id })
  eventId!: string

  static create(params: TalkResponseDTO) {
    const talkResponseDTO = new TalkResponseDTO()

    talkResponseDTO.id = params.id
    talkResponseDTO.title = params.title
    talkResponseDTO.description = params.description
    talkResponseDTO.language = params.language
    talkResponseDTO.cospeakers = params.cospeakers
    talkResponseDTO.status = params.status
    talkResponseDTO.speakerId = params.speakerId
    talkResponseDTO.eventId = params.eventId
    talkResponseDTO.reviewerId = params.reviewerId
    talkResponseDTO.isApproved = params.isApproved

    return talkResponseDTO
  }
}
