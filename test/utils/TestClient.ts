import { HttpStatus } from '@nestjs/common'
import { tepper } from 'tepper'
import { VLCTECHFEST } from '../../src/shared/infrastructure/fixtures/events'
import { EventResponseDTO } from '../../src/events/infrastructure/controllers/dtos/EventResponseDTO'
import { PAOLA } from '../../src/shared/infrastructure/fixtures/speakers'
import { DISCOVERING_TECH_TALENT } from '../../src/shared/infrastructure/fixtures/talks'
import { CESAR } from '../../src/shared/infrastructure/fixtures/organizers'
import { TestApi } from './TestApi'

export class TestClient {
  constructor(private readonly testApi: TestApi) {}

  get app() {
    return this.testApi.getApp()
  }

  getClock() {
    return this.testApi.getClock()
  }

  getEventBus() {
    return this.testApi.getEventBus()
  }

  getEmailSender() {
    return this.testApi.getEmailSender()
  }

  health() {
    return tepper(this.app).get('/health')
  }

  createEvent({ id = VLCTECHFEST.id } = {}) {
    return tepper(this.app)
      .post('/api/v1/events')
      .send({
        id,
        name: VLCTECHFEST.name,
        dateRange: {
          startDate: VLCTECHFEST.startDate,
          endDate: VLCTECHFEST.endDate,
        },
        proposalsDateRange: {
          startDate: VLCTECHFEST.proposalsStartDate,
          deadline: VLCTECHFEST.proposalsDeadlineDate,
        },
      })
      .expectStatus(HttpStatus.CREATED)
  }

  registerSpeaker({ id = PAOLA.id } = {}) {
    return tepper(this.app)
      .post('/api/v1/speakers/registration')
      .send({
        id,
        email: PAOLA.email,
        password: PAOLA.password,
      })
      .expectStatus(HttpStatus.CREATED)
  }

  loginSpeaker() {
    return tepper(this.app)
      .post('/api/v1/speakers/login')
      .send({
        email: PAOLA.email,
        password: PAOLA.password,
      })
      .expectStatus(HttpStatus.OK)
  }

  proposeTalk({ id = DISCOVERING_TECH_TALENT.id } = {}) {
    return tepper(this.app)
      .post('/api/v1/talks')
      .send({
        id,
        title: DISCOVERING_TECH_TALENT.title,
        description: DISCOVERING_TECH_TALENT.description,
        language: DISCOVERING_TECH_TALENT.language,
        cospeakers: DISCOVERING_TECH_TALENT.cospeakers,
        speakerId: PAOLA.id,
        eventId: VLCTECHFEST.id,
      })
      .expectStatus(HttpStatus.CREATED)
  }

  getTalk(id = DISCOVERING_TECH_TALENT.id) {
    return tepper(this.app).get(`/api/v1/talks/${id}`).expectStatus(HttpStatus.OK)
  }

  updateProfile({ id = PAOLA.id, jwt = '' } = {}) {
    return tepper(this.app)
      .put(`/api/v1/speakers/${id}/profile`)
      .authWith(jwt)
      .send({
        name: PAOLA.name,
        age: PAOLA.age,
        language: PAOLA.language,
      })
      .expectStatus(HttpStatus.OK)
  }

  getSpeaker({ id = PAOLA.id, jwt = PAOLA.jwt } = {}) {
    return tepper(this.app).get(`/api/v1/speakers/${id}`).authWith(jwt).expectStatus(HttpStatus.OK)
  }

  getEvents() {
    return tepper(this.app).get<EventResponseDTO[]>('/api/v1/events').expectStatus(HttpStatus.OK)
  }

  assignReviewer({ id = DISCOVERING_TECH_TALENT.id, reviewerId = CESAR.id }) {
    return tepper(this.app)
      .put<EventResponseDTO[]>(`/api/v1/talks/${id}/assignation`)
      .send({ reviewerId })
      .expectStatus(HttpStatus.OK)
  }

  approveTalk({ id = DISCOVERING_TECH_TALENT.id }) {
    return tepper(this.app)
      .put<EventResponseDTO[]>(`/api/v1/talks/${id}/approve`)

      .expectStatus(HttpStatus.OK)
  }
}
