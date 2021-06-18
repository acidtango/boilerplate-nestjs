/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable max-classes-per-file */
import { RequestMethod } from '@nestjs/common'
import { Server } from 'http'
import RequestExecutor from './request-executor'

export class RequestWrapper {
  constructor(private app: Server) {}

  post(url: string) {
    return new RequestExecutor(this.app, url, RequestMethod.POST)
  }

  get(url: string) {
    return new RequestExecutor(this.app, url, RequestMethod.GET)
  }

  patch(url: string) {
    return new RequestExecutor(this.app, url, RequestMethod.PATCH)
  }
}

export function request(app: Server) {
  return new RequestWrapper(app)
}
