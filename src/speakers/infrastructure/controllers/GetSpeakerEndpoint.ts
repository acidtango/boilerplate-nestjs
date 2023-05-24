import { GetSpeaker } from '../../use-cases/GetSpeaker'
import { SpeakerResponseDTO } from './dtos/SpeakerResponseDTO'
import { Controller, Get, HttpStatus, Param } from '@nestjs/common'
import { DocumentationTag, Endpoint } from '../../../shared/infrastructure/decorators/Endpoint'
import { SpeakerId } from '../../../shared/domain/models/ids/SpeakerId'
import { SpeakerProfileDTO } from './dtos/SpeakerProfileDTO'
import { Role } from '../../../shared/domain/models/Role'
import { SpeakerProfilePrimitives } from '../../domain/models/SpeakerProfile'
import { ApiParam } from '@nestjs/swagger'
import { CONCHA_ASENSIO } from '../../../shared/infrastructure/fixtures/speakers'

@Controller('/v1/speakers/:id')
export class GetSpeakerEndpoint {
  constructor(private readonly getSpeaker: GetSpeaker) {}

  @Endpoint({
    tag: DocumentationTag.SPEAKERS,
    description: 'Get speaker',
    status: HttpStatus.OK,
    roles: [Role.SPEAKER],
  })
  @ApiParam({ name: 'id', example: CONCHA_ASENSIO.id })
  @Get()
  async execute(@Param('id') id: string): Promise<SpeakerResponseDTO> {
    const speaker = await this.getSpeaker.execute(SpeakerId.fromPrimitives(id))

    const speakerPrimitives = speaker.toPrimitives()

    return SpeakerResponseDTO.create({
      id: speakerPrimitives.id,
      email: speakerPrimitives.email,
      isEmailValidated: speakerPrimitives.isEmailValidated,
      profile: this.mapProfileToDTO(speakerPrimitives.profile),
    })
  }

  private mapProfileToDTO(profilePrimitives?: SpeakerProfilePrimitives) {
    if (!profilePrimitives) {
      return undefined
    }

    return SpeakerProfileDTO.create({
      name: profilePrimitives.name,
      age: profilePrimitives.age,
      language: profilePrimitives.language,
    })
  }
}
