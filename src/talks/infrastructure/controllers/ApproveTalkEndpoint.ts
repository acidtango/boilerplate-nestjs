import { Controller, HttpStatus, Param, Put } from '@nestjs/common'
import { DocumentationTag, Endpoint } from '../../../shared/infrastructure/decorators/Endpoint'
import { ApproveTalk } from '../../use-cases/ApproveTalk'
import { TalkId } from '../../../shared/domain/models/ids/TalkId'
import { ApiParam } from '@nestjs/swagger'
import { JUNIOR_XP } from '../../../shared/infrastructure/fixtures/talks'

@Controller('/v1/talks/:id/approve')
export class ApproveTalkEndpoint {
  constructor(private readonly approveTalk: ApproveTalk) {}

  @Endpoint({
    tag: DocumentationTag.TALKS,
    description: 'Approve talk',
    status: HttpStatus.OK,
  })
  @ApiParam({ name: 'id', example: JUNIOR_XP.id })
  @Put()
  async execute(@Param('id') id: string) {
    await this.approveTalk.execute(TalkId.fromPrimitives(id))
  }
}
