import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsString, IsUUID } from 'class-validator'
import { JUNIOR_XP } from '../../../../shared/infrastructure/fixtures/talks'
import { Language } from '../../../../shared/domain/models/Language'
import { CONCHA_ASENSIO } from '../../../../shared/infrastructure/fixtures/speakers'
import { JSDAY_CANARIAS } from '../../../../shared/infrastructure/fixtures/events'

export class ProposeTalkRequestDTO {
  @ApiProperty({ example: JUNIOR_XP.id })
  @IsUUID()
  id!: string

  @ApiProperty({ example: JUNIOR_XP.title })
  @IsString()
  title!: string

  @ApiProperty({ example: JUNIOR_XP.description })
  @IsString()
  description!: string

  @ApiProperty({ example: Language.ENGLISH, enum: Language })
  @IsEnum(Language)
  language!: Language

  @ApiProperty({ example: JUNIOR_XP.cospeakers, type: [String] })
  @IsString({ each: true })
  cospeakers!: string[]

  @ApiProperty({ example: CONCHA_ASENSIO.id })
  @IsUUID()
  speakerId!: string

  @ApiProperty({ example: JSDAY_CANARIAS.id })
  @IsUUID()
  eventId!: string
}
