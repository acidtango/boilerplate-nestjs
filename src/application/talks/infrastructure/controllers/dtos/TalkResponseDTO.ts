import { ApiProperty } from '@nestjs/swagger'
import { CODEMOTION } from '../../../../../shared/fixtures/events'
import { JOYCE_LIN } from '../../../../../shared/fixtures/speakers'
import { API_TALK } from '../../../../../shared/fixtures/talks'
import { Language } from '../../../../shared/domain/Language'
import { TalkStatus } from '../../../domain/TalkStatus'
import { FRAN } from '../../../../../shared/fixtures/organizers'

type TalkReponseDTOParams = {
  id: string
  title: string
  description: string
  language: Language
  cospeakers: string[]
  status: TalkStatus
  speakerId: string
  eventId: string
  reviewerId?: string
}

export class TalkResponseDTO {
  @ApiProperty({ example: API_TALK.id })
  id!: string

  @ApiProperty({ example: API_TALK.title })
  title!: string

  @ApiProperty({ example: API_TALK.description })
  description!: string

  @ApiProperty({ example: Language.ENGLISH, enum: Language })
  language!: Language

  @ApiProperty({ example: API_TALK.cospeakers, type: [String] })
  cospeakers!: string[]

  @ApiProperty({ example: TalkStatus.PROPOSAL, enum: TalkStatus })
  status!: TalkStatus

  @ApiProperty({ example: JOYCE_LIN.id })
  speakerId!: string

  @ApiProperty({ example: CODEMOTION.id })
  eventId!: string

  @ApiProperty({ example: FRAN.id, required: false })
  reviewerId?: string

  static create(params: TalkReponseDTOParams) {
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

    return talkResponseDTO
  }
}
