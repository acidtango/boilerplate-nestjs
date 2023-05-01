import { Language } from '../../shared/domain/Language'

export type Talk = {
  id: string
  title: string
  description: string
  language: Language
  cospeakers: string[]
  speakerId: string
  reviewerId?: string
  eventId: string
  isApproved?: boolean
}
