import { HttpStatus } from '@nestjs/common'
import { tepper } from 'tepper'
import { JSDAY_CANARIAS } from '../../src/shared/infrastructure/fixtures/events'
import { EventResponseDTO } from '../../src/events/infrastructure/controllers/dtos/EventResponseDTO'
import { CONCHA_ASENSIO } from '../../src/shared/infrastructure/fixtures/speakers'
import { JUNIOR_XP } from '../../src/shared/infrastructure/fixtures/talks'
import { DAILOS } from '../../src/shared/infrastructure/fixtures/organizers'
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

  createEvent({ id = JSDAY_CANARIAS.id } = {}) {
    return tepper(this.app)
      .post('/api/v1/events')
      .send({
        id,
        name: JSDAY_CANARIAS.name,
        dateRange: {
          startDate: JSDAY_CANARIAS.startDate,
          endDate: JSDAY_CANARIAS.endDate,
        },
        proposalsDateRange: {
          startDate: JSDAY_CANARIAS.proposalsStartDate,
          deadline: JSDAY_CANARIAS.proposalsDeadlineDate,
        },
      })
      .expectStatus(HttpStatus.CREATED)
  }

  registerSpeaker({ id = CONCHA_ASENSIO.id } = {}) {
    return tepper(this.app)
      .post('/api/v1/speakers/registration')
      .send({
        id,
        email: CONCHA_ASENSIO.email,
        password: CONCHA_ASENSIO.password,
      })
      .expectStatus(HttpStatus.CREATED)
  }

  loginSpeaker() {
    return tepper(this.app)
      .post('/api/v1/speakers/login')
      .send({
        email: CONCHA_ASENSIO.email,
        password: CONCHA_ASENSIO.password,
      })
      .expectStatus(HttpStatus.OK)
  }

  proposeTalk({ id = JUNIOR_XP.id } = {}) {
    return tepper(this.app)
      .post('/api/v1/talks')
      .send({
        id,
        title: JUNIOR_XP.title,
        description: JUNIOR_XP.description,
        language: JUNIOR_XP.language,
        cospeakers: JUNIOR_XP.cospeakers,
        speakerId: CONCHA_ASENSIO.id,
        eventId: JSDAY_CANARIAS.id,
      })
      .expectStatus(HttpStatus.CREATED)
  }

  getTalk(id = JUNIOR_XP.id) {
    return tepper(this.app).get(`/api/v1/talks/${id}`).expectStatus(HttpStatus.OK)
  }

  updateProfile({ id = CONCHA_ASENSIO.id, jwt = '' } = {}) {
    return tepper(this.app)
      .put(`/api/v1/speakers/${id}/profile`)
      .authWith(jwt)
      .send({
        name: CONCHA_ASENSIO.name,
        age: CONCHA_ASENSIO.age,
        language: CONCHA_ASENSIO.language,
      })
      .expectStatus(HttpStatus.OK)
  }

  getSpeaker({ id = CONCHA_ASENSIO.id, jwt = CONCHA_ASENSIO.jwt } = {}) {
    return tepper(this.app).get(`/api/v1/speakers/${id}`).authWith(jwt).expectStatus(HttpStatus.OK)
  }

  getEvents() {
    return tepper(this.app).get<EventResponseDTO[]>('/api/v1/events').expectStatus(HttpStatus.OK)
  }

  assignReviewer({ id = JUNIOR_XP.id, reviewerId = DAILOS.id }) {
    return tepper(this.app)
      .put<EventResponseDTO[]>(`/api/v1/talks/${id}/assignation`)
      .send({ reviewerId })
      .expectStatus(HttpStatus.OK)
  }

  approveTalk({ id = JUNIOR_XP.id }) {
    return tepper(this.app)
      .put<EventResponseDTO[]>(`/api/v1/talks/${id}/approve`)

      .expectStatus(HttpStatus.OK)
  }
}
