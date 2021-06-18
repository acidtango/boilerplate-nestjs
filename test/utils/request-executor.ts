/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestMethod } from '@nestjs/common'
import { Server } from 'http'
import { Response, SuperTest, Test } from 'supertest'
import supertestRequest = require('supertest')

export type AttachedFile = { path: string; field: string }
export type Field = { name: string; value: string | boolean | number }
export type QueryType = Record<string, string | number | boolean | undefined>

export default class RequestExecutor {
  constructor(private app: Server, private url: string, private method: RequestMethod) {}

  private body?: any

  private query?: any

  private jwt?: string

  private attachedFiles = [] as AttachedFile[]

  private forwardedFor?: string

  private fields = [] as Field[]

  private expectedStatus?: number

  private expectedBody: any

  send(body: any) {
    this.body = body
    return this
  }

  setForwardedForIP(ip: string) {
    this.forwardedFor = ip
    return this
  }

  withQuery(query: QueryType) {
    this.query = query
    return this
  }

  authWithBearer(jwt: string) {
    this.jwt = jwt
    return this
  }

  attach(attachedFile: AttachedFile) {
    this.attachedFiles.push(attachedFile)
    return this
  }

  withField(name: string, value: string | boolean | number) {
    this.fields.push({ name, value })
    return this
  }

  withFields(name: string, fields: Record<string, string | boolean | number>) {
    const groupedFields = Object.entries(fields).map(([key, value]) => ({
      name: `${name}[${key}]`,
      value,
    }))

    this.fields = [...this.fields, ...groupedFields]

    return this
  }

  attachFiles(attachedFiles: AttachedFile[]) {
    this.attachedFiles = attachedFiles
    return this
  }

  expect(number: number) {
    this.expectedStatus = number
    return this
  }

  expectBody(body: any) {
    this.expectedBody = body
    return this
  }

  async run() {
    let requestChain = this.getRequestChain(supertestRequest(this.app))

    requestChain = this.setupRequest(requestChain)

    const response = await requestChain

    this.executeExpectations(response)

    return response
  }

  private executeExpectations(response: Response) {
    try {
      if (this.expectedStatus) expect(response.status).toEqual(this.expectedStatus)
      if (this.expectedBody) expect(response.body).toEqual(this.expectedBody)
    } catch (error: any) {
      error.stack = error.stack.replace(/.*TestExpectationExecutor.executeExpectations.*\n/, '')
      error.stack = error.stack.replace(/.*TestExpectationExecutor.run.*\n/, '')
      error.stack = error.stack.replace(/.*processTicksAndRejections.*\n/, '')

      // eslint-disable-next-line no-console
      console.error(response.body)

      throw error
    }
  }

  private setupRequest(chain: Test) {
    let preparedChain = chain
    if (this.body) preparedChain = preparedChain.send(this.body)
    if (this.jwt) preparedChain = preparedChain.auth(this.jwt, { type: 'bearer' })
    if (this.query) preparedChain = preparedChain.query(this.query)
    if (this.forwardedFor) preparedChain = preparedChain.set('X-Forwarded-For', this.forwardedFor)
    this.attachedFiles.forEach((file) => {
      preparedChain = preparedChain.attach(file.field, file.path)
    })
    this.fields.forEach((field) => {
      preparedChain = preparedChain.field(field.name, field.value)
    })

    return preparedChain
  }

  private getRequestChain(chain: SuperTest<Test>): Test {
    const methods: Record<RequestMethod, () => Test> = {
      [RequestMethod.POST]: () => chain.post(this.url),
      [RequestMethod.GET]: () => chain.get(this.url),
      [RequestMethod.PATCH]: () => chain.patch(this.url),
      [RequestMethod.PUT]: () => {
        throw new Error('PUT Not implemented')
      },
      [RequestMethod.DELETE]: () => {
        throw new Error('DELETE Not implemented')
      },
      [RequestMethod.OPTIONS]: () => {
        throw new Error('OPTIONS Not implemented')
      },
      [RequestMethod.HEAD]: () => {
        throw new Error('HEAD Not implemented')
      },
      [RequestMethod.ALL]: () => {
        throw new Error('ALL Not implemented')
      },
    }

    return methods[this.method]()
  }

  /**
   * keep this method to add a compile-time error if awaiting but not launching .run()
   */
  then() {
    throw new Error("You must call the 'run' method first")
  }
}
