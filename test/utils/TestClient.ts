import { HttpStatus } from '@nestjs/common'
import tepper from 'tepper'
import { CODEMOTION } from '../../src/codetalk/shared/infrastructure/fixtures/events'
import { EventResponseDTO } from '../../src/codetalk/events/infrastructure/controllers/dtos/EventResponseDTO'
import { JOYCE_LIN } from '../../src/codetalk/shared/infrastructure/fixtures/speakers'
import { API_TALK } from '../../src/codetalk/shared/infrastructure/fixtures/talks'
import { FRAN } from '../../src/codetalk/shared/infrastructure/fixtures/organizers'
import { TestApi } from './TestApi'

export class TestClient {
  constructor(private readonly testApi: TestApi) {}

  get app() {
    return this.testApi.getApp()
  }

  getClock() {
    return this.testApi.getClock()
  }

  health() {
    return tepper(this.app).get('/health')
  }

  createEvent({ id = CODEMOTION.id } = {}) {
    return tepper(this.app)
      .post('/api/v1/events')
      .send({
        id,
        name: CODEMOTION.name,
        dateRange: {
          startDate: CODEMOTION.startDate,
          endDate: CODEMOTION.endDate,
        },
        proposalsDateRange: {
          startDate: CODEMOTION.proposalsStartDate,
          deadline: CODEMOTION.proposalsDeadlineDate,
        },
      })
      .expectStatus(HttpStatus.CREATED)
  }

  registerSpeaker({ id = JOYCE_LIN.id } = {}) {
    return tepper(this.app)
      .post('/api/v1/speakers/registration')
      .send({
        id,
        email: JOYCE_LIN.email,
        password: JOYCE_LIN.password,
      })
      .expectStatus(HttpStatus.CREATED)
  }

  loginSpeaker() {
    return tepper(this.app)
      .post('/api/v1/speakers/login')
      .send({
        email: JOYCE_LIN.email,
        password: JOYCE_LIN.password,
      })
      .expectStatus(HttpStatus.OK)
  }

  createSpeaker({ id = JOYCE_LIN.id } = {}) {
    return tepper(this.app)
      .post('/api/v1/speakers')
      .send({
        id,
        name: JOYCE_LIN.name,
        age: JOYCE_LIN.age,
        language: JOYCE_LIN.language,
        email: JOYCE_LIN.email,
      })
      .expectStatus(HttpStatus.CREATED)
  }

  createTalk({ id = API_TALK.id } = {}) {
    return tepper(this.app)
      .post('/api/v1/talks')
      .send({
        id,
        title: API_TALK.title,
        description: API_TALK.description,
        language: API_TALK.language,
        cospeakers: API_TALK.cospeakers,
        speakerId: JOYCE_LIN.id,
        eventId: CODEMOTION.id,
      })
      .expectStatus(HttpStatus.CREATED)
  }

  getTalk(id = API_TALK.id) {
    return tepper(this.app).get(`/api/v1/talks/${id}`).expectStatus(HttpStatus.OK)
  }

  getSpeaker(id = JOYCE_LIN.id) {
    return tepper(this.app).get(`/api/v1/speakers/${id}`).expectStatus(HttpStatus.OK)
  }

  getEvents() {
    return tepper(this.app).get<EventResponseDTO[]>('/api/v1/events').expectStatus(HttpStatus.OK)
  }

  assignReviewer({ id = API_TALK.id, reviewerId = FRAN.id }) {
    return tepper(this.app)
      .put<EventResponseDTO[]>(`/api/v1/talks/${id}/assignation`)
      .send({ reviewerId })
      .expectStatus(HttpStatus.OK)
  }

  approveTalk({ id = API_TALK.id }) {
    return tepper(this.app)
      .put<EventResponseDTO[]>(`/api/v1/talks/${id}/approve`)

      .expectStatus(HttpStatus.OK)
  }
}
