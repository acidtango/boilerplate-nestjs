import { Body, Controller, HttpStatus, Param, Put } from '@nestjs/common'
import { DocumentationTag, Endpoint } from '../../../shared/infrastructure/decorators/Endpoint'
import { SpeakerProfileDTO } from './dtos/SpeakerProfileDTO'
import { UpdateSpeakerProfile } from '../../use-cases/UpdateSpeakerProfile'
import { SpeakerId } from '../../../shared/domain/models/ids/SpeakerId'
import { SpeakerName } from '../../domain/models/SpeakerName'
import { SpeakerAge } from '../../domain/models/SpeakerAge'
import { ApiParam } from '@nestjs/swagger'
import { CONCHA_ASENSIO } from '../../../shared/infrastructure/fixtures/speakers'

@Controller('/v1/speakers/:id/profile')
export class UpdateSpeakerProfileEndpoint {
  constructor(private readonly updateSpeakerProfile: UpdateSpeakerProfile) {}

  @Endpoint({
    tag: DocumentationTag.SPEAKERS,
    description: 'Updates a speaker profile',
    status: HttpStatus.OK,
  })
  @ApiParam({ name: 'id', example: CONCHA_ASENSIO.id })
  @Put()
  async execute(@Param('id') id: string, @Body() body: SpeakerProfileDTO) {
    await this.updateSpeakerProfile.execute({
      id: SpeakerId.fromPrimitives(id),
      name: SpeakerName.fromPrimitives(body.name),
      age: SpeakerAge.fromPrimitives(body.age),
      language: body.language,
    })
  }
}
