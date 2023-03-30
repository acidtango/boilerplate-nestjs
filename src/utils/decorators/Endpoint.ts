import { applyDecorators, HttpCode } from '@nestjs/common'
import {
  ApiOperation,
  ApiResponse,
  ApiResponseOptions,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger'
import { Public } from './Public'

export enum DocumentationTag {
  HEALTH = 'Health',
}

export type Options = {
  tags: DocumentationTag[]
  isPublic?: boolean
}
export type EndpointOptions = ApiResponseOptions & Options

export function Endpoint(options: EndpointOptions) {
  if (options.status && typeof options.status === 'number') {
    const { description, isPublic, ...remainingOptions } = options
    const decorators = [
      ApiOperation({ summary: description }),
      ApiResponse(remainingOptions),
      HttpCode(options.status),
      ApiTags(...options.tags),
    ]

    if (isPublic) return applyDecorators(...decorators, Public())

    return applyDecorators(...decorators, ApiSecurity('basic-auth'))
  }

  return applyDecorators(ApiResponse(options), ApiTags(...options.tags), ApiSecurity('basic-auth'))
}
