import { GetSpeaker } from '../../use-cases/GetSpeaker'
import { SpeakerResponseDTO } from './dtos/SpeakerResponseDTO'
import { Controller, Get, HttpStatus, Param } from '@nestjs/common'
import { DocumentationTag, Endpoint } from '../../../../utils/decorators/Endpoint'
import { SpeakerId } from '../../../shared/domain/models/ids/SpeakerId'

@Controller('/v1/speakers/:id')
export class GetSpeakerEndpoint {
  constructor(private readonly getSpeaker: GetSpeaker) {}

  @Endpoint({
    tag: DocumentationTag.SPEAKERS,
    description: 'Get speaker',
    status: HttpStatus.OK,
  })
  @Get()
  async execute(@Param('id') id: string): Promise<SpeakerResponseDTO> {
    const speaker = await this.getSpeaker.execute(SpeakerId.fromPrimitives(id))

    const speakerPrimitives = speaker.toPrimitives()

    return SpeakerResponseDTO.create(speakerPrimitives)
  }
}
