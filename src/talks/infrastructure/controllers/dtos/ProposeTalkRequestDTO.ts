import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsString, IsUUID } from 'class-validator'
import { API_TALK } from '../../../../shared/infrastructure/fixtures/talks'
import { Language } from '../../../../shared/domain/models/Language'
import { JOYCE_LIN } from '../../../../shared/infrastructure/fixtures/speakers'
import { CODEMOTION } from '../../../../shared/infrastructure/fixtures/events'

export class ProposeTalkRequestDTO {
  @ApiProperty({ example: API_TALK.id })
  @IsUUID()
  id!: string

  @ApiProperty({ example: API_TALK.title })
  @IsString()
  title!: string

  @ApiProperty({ example: API_TALK.description })
  @IsString()
  description!: string

  @ApiProperty({ example: Language.ENGLISH, enum: Language })
  @IsEnum(Language)
  language!: Language

  @ApiProperty({ example: API_TALK.cospeakers, type: [String] })
  @IsString({ each: true })
  cospeakers!: string[]

  @ApiProperty({ example: JOYCE_LIN.id })
  @IsUUID()
  speakerId!: string

  @ApiProperty({ example: CODEMOTION.id })
  @IsUUID()
  eventId!: string
}
