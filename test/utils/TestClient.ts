import { expect } from 'vitest'
import type { OpenAPIHono } from '@hono/zod-openapi'
import type { Container } from 'inversify'
import { container } from '../../src/container.ts'
import type { Clock } from '../../src/shared/domain/services/Clock.ts'
import { CONCHA_ASENSIO } from '../../src/shared/infrastructure/fixtures/speakers.ts'
import { Token } from '../../src/shared/domain/services/Token.ts'
import {
  isReseteable,
  type Reseteable,
} from '../../src/shared/infrastructure/repositories/Reseteable.ts'
import { JSDAY_CANARIAS } from '../../src/shared/infrastructure/fixtures/events.ts'
import { MongoClient } from 'mongodb'

class TestClient {
  public readonly container: Container
  private app: OpenAPIHono

  public static async create(container: Container) {
    return new TestClient(await container.getAsync(Token.APP), container)
  }

  constructor(app: OpenAPIHono, container: Container) {
    this.app = app
    this.container = container
  }

  getClock() {
    return this.container.get<Clock>(Token.CLOCK)
  }

  async reset() {
    const repositories = await Promise.all([
      this.container.getAsync<Reseteable>(Token.SPEAKER_REPOSITORY),
      this.container.getAsync<Reseteable>(Token.EVENT_REPOSITORY),
    ]).then((repositories) => repositories.filter(isReseteable))

    for (const repository of repositories) {
      await repository.reset()
    }
  }

  async close() {
    const mongoClient = this.container.get(MongoClient)
    await mongoClient.close()
  }

  async registerSpeaker() {
    const res = await this.app.request('/api/v1/speakers/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: CONCHA_ASENSIO.id,
        email: CONCHA_ASENSIO.email,
        password: CONCHA_ASENSIO.password,
      }),
    })
    expect(res.status).toBe(201)
    return {
      status: res.status,
      res,
    }
  }

  async loginSpeaker() {
    const res = await this.app.request('/api/v1/speakers/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: CONCHA_ASENSIO.email,
        password: CONCHA_ASENSIO.password,
      }),
    })
    expect(res.status).toBe(200)
    return {
      status: res.status,
      body: await res.json(),
      res,
    }
  }

  async updateProfile({ id = CONCHA_ASENSIO.id, jwt = '' } = {}) {
    const res = await this.app.request(`/api/v1/speakers/${id}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        name: CONCHA_ASENSIO.name,
        age: CONCHA_ASENSIO.age,
        language: CONCHA_ASENSIO.language,
      }),
    })
    console.log(await res.text())
    expect(res.status).toBe(200)
    return {
      status: res.status,
      res,
    }
  }

  async getSpeaker({ id = CONCHA_ASENSIO.id, jwt = CONCHA_ASENSIO.jwt } = {}) {
    const res = await this.app.request(`/api/v1/speakers/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    expect(res.status).toBe(200)
    return {
      status: res.status,
      body: await res.json(),
      res,
    }
  }

  async createEvent() {
    const res = await this.app.request('/api/v1/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: JSDAY_CANARIAS.id,
        name: JSDAY_CANARIAS.name,
        dateRange: {
          startDate: JSDAY_CANARIAS.startDate,
          endDate: JSDAY_CANARIAS.endDate,
        },
        proposalsDateRange: {
          startDate: JSDAY_CANARIAS.proposalsStartDate,
          deadline: JSDAY_CANARIAS.proposalsDeadlineDate,
        },
      }),
    })
    expect(res.status).toBe(201)
    return {
      status: res.status,
      res,
    }
  }

  async getEvents() {
    const res = await this.app.request('/api/v1/events')
    expect(res.status).toBe(200)
    return {
      status: res.status,
      body: await res.json(),
      res,
    }
  }
}

export async function createClient() {
  return TestClient.create(container)
}
