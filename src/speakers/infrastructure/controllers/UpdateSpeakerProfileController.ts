/*
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
export class UpdateSpeakerProfileController {
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
*/

import { createRoute, OpenAPIHono, type RouteConfig, z } from '@hono/zod-openapi'
import type { HonoController } from '../../../shared/infrastructure/HonoController.ts'
import type { interfaces } from 'inversify'
import { SpeakerId } from '../../../shared/domain/models/ids/SpeakerId.ts'
import { UpdateSpeakerProfile } from '../../use-cases/UpdateSpeakerProfile.ts'
import { SpeakerProfileDTO } from './dtos/SpeakerProfileDTO.ts'
import { SpeakerName } from '../../domain/models/SpeakerName.ts'
import { SpeakerAge } from '../../domain/models/SpeakerAge.ts'
import { CONCHA_ASENSIO } from '../../../shared/infrastructure/fixtures/speakers.ts'

const ParamsSchema = z.object({
  id: z
    .string()
    .uuid()
    .openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      example: CONCHA_ASENSIO.id,
    }),
})

export class UpdateSpeakerProfileController implements HonoController {
  private static Schema = {
    method: 'put',
    path: '/api/v1/speakers/:id/profile',
    request: {
      params: ParamsSchema,
      body: {
        content: {
          'application/json': {
            schema: SpeakerProfileDTO,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Speaker profile updated',
      },
    },
  } satisfies RouteConfig

  public static create({ container }: interfaces.Context) {
    return new UpdateSpeakerProfileController(container.get(UpdateSpeakerProfile))
  }

  private readonly updateSpeakerProfile: UpdateSpeakerProfile

  constructor(registerSpeaker: UpdateSpeakerProfile) {
    this.updateSpeakerProfile = registerSpeaker
  }

  register(api: OpenAPIHono) {
    api.openapi(createRoute(UpdateSpeakerProfileController.Schema), async (c) => {
      const body = c.req.valid('json')
      const param = c.req.valid('param')
      await this.updateSpeakerProfile.execute({
        id: SpeakerId.fromPrimitives(param.id),
        name: SpeakerName.fromPrimitives(body.name),
        age: SpeakerAge.fromPrimitives(body.age),
        language: body.language,
      })
      return c.body(null, 200)
    })
  }
}
