import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsString, IsUUID } from 'class-validator'
import { DISCOVERING_TECH_TALENT } from '../../../../shared/infrastructure/fixtures/talks'
import { Language } from '../../../../shared/domain/models/Language'
import { PAOLA } from '../../../../shared/infrastructure/fixtures/speakers'
import { VLCTECHFEST } from '../../../../shared/infrastructure/fixtures/events'

export class ProposeTalkRequestDTO {
  @ApiProperty({ example: DISCOVERING_TECH_TALENT.id })
  @IsUUID()
  id!: string

  @ApiProperty({ example: DISCOVERING_TECH_TALENT.title })
  @IsString()
  title!: string

  @ApiProperty({ example: DISCOVERING_TECH_TALENT.description })
  @IsString()
  description!: string

  @ApiProperty({ example: Language.ENGLISH, enum: Language })
  @IsEnum(Language)
  language!: Language

  @ApiProperty({ example: DISCOVERING_TECH_TALENT.cospeakers, type: [String] })
  @IsString({ each: true })
  cospeakers!: string[]

  @ApiProperty({ example: PAOLA.id })
  @IsUUID()
  speakerId!: string

  @ApiProperty({ example: VLCTECHFEST.id })
  @IsUUID()
  eventId!: string
}
