import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { Response } from 'express'
import { DomainError } from '../../domain/errors/DomainError'
import { domainErrorToHttpStatusCode } from '../errors/domainErrorToHttpStatusCode'

@Catch(DomainError)
export class DomainErrorFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const httpStatusCode = domainErrorToHttpStatusCode[exception.code]

    response.status(httpStatusCode).json({
      statusCode: httpStatusCode,
      error: exception.code,
      message: exception.message,
    })
  }
}
