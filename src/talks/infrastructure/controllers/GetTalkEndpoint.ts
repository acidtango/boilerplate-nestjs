import { Controller, Get, HttpStatus, Param } from '@nestjs/common'
import { DocumentationTag, Endpoint } from '../../../shared/infrastructure/decorators/Endpoint'
import { GetTalk } from '../../use-cases/GetTalk'
import { TalkId } from '../../../shared/domain/models/ids/TalkId'
import { TalkResponseDTO } from './dtos/TalkResponseDTO'

@Controller('/v1/talks/:id')
export class GetTalkEndpoint {
  constructor(private readonly getTalk: GetTalk) {}

  @Endpoint({
    tag: DocumentationTag.TALKS,
    description: 'Get talk by id',
    status: HttpStatus.OK,
  })
  @Get()
  async execute(@Param('id') id: string): Promise<TalkResponseDTO> {
    const talk = await this.getTalk.execute(new TalkId(id))

    return TalkResponseDTO.create(talk.toPrimitives())
  }
}
