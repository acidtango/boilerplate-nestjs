import { applyDecorators, HttpCode, SetMetadata } from '@nestjs/common'
import {
  ApiOperation,
  ApiResponse,
  ApiResponseMetadata,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger'
import { Public } from './Public'
import { Role } from '../../domain/models/Role'

export enum DocumentationTag {
  HEALTH = 'Health',
  EVENTS = 'Events',
  SPEAKERS = 'Speakers',
  TALKS = 'Talks',
}

export type Options = {
  tag: DocumentationTag
  roles?: Role[]
}
export type EndpointOptions = ApiResponseMetadata & Options

export function Endpoint(options: EndpointOptions) {
  if (options.status && typeof options.status === 'number') {
    const { description, roles, ...remainingOptions } = options
    const decorators = [
      ApiOperation({ summary: description }),
      ApiResponse(remainingOptions),
      HttpCode(options.status),
      ApiTags(options.tag),
    ]

    if (!roles) return applyDecorators(...decorators, Public())

    return applyDecorators(...decorators, ApiSecurity('bearer'), SetMetadata('roles', roles))
  }

  return applyDecorators(ApiResponse(options), ApiTags(options.tag), ApiSecurity('bearer'))
}
