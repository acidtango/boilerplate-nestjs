import { GetSpeaker } from '../../use-cases/GetSpeaker'
import { SpeakerResponseDTO } from './dtos/SpeakerResponseDTO'
import { Controller, Get, HttpStatus, Param } from '@nestjs/common'
import { DocumentationTag, Endpoint } from '../../../shared/infrastructure/decorators/Endpoint'
import { SpeakerId } from '../../../shared/domain/models/ids/SpeakerId'
import { SpeakerProfileDTO } from './dtos/SpeakerProfileDTO'
import { CONCHA_ASENSIO } from '../../../shared/infrastructure/fixtures/speakers'
import { Role } from '../../../shared/domain/models/Role'

@Controller('/v1/speakers/:id')
export class GetSpeakerEndpoint {
  constructor(private readonly getSpeaker: GetSpeaker) {}

  @Endpoint({
    tag: DocumentationTag.SPEAKERS,
    description: 'Get speaker',
    status: HttpStatus.OK,
    roles: [Role.SPEAKER],
  })
  @Get()
  async execute(@Param('id') id: string): Promise<SpeakerResponseDTO> {
    const speaker = await this.getSpeaker.execute(SpeakerId.fromPrimitives(id))

    const speakerPrimitives = speaker.toPrimitives()

    return SpeakerResponseDTO.create({
      id: speakerPrimitives.id,
      name: speakerPrimitives.name,
      age: speakerPrimitives.age,
      language: speakerPrimitives.language,
      email: speakerPrimitives.email,
      isEmailValidated: speakerPrimitives.isEmailValidated,
      profile: SpeakerProfileDTO.create({
        name: CONCHA_ASENSIO.name,
        age: CONCHA_ASENSIO.age,
        language: CONCHA_ASENSIO.language,
      }),
    })
  }
}
