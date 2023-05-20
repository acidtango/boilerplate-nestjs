import { Controller, HttpStatus, Param, Put } from '@nestjs/common'
import { DocumentationTag, Endpoint } from '../../../shared/infrastructure/decorators/Endpoint'
import { ApproveTalk } from '../../use-cases/ApproveTalk'
import { TalkId } from '../../../shared/domain/models/ids/TalkId'

@Controller('/v1/talks/:id/approve')
export class ApproveTalkEndpoint {
  constructor(private readonly approveTalk: ApproveTalk) {}

  @Endpoint({
    tag: DocumentationTag.TALKS,
    description: 'Approve talk',
    status: HttpStatus.OK,
  })
  @Put()
  async execute(@Param('id') id: string) {
    await this.approveTalk.execute(TalkId.fromPrimitives(id))
  }
}
