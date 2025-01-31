export const DomainEventCode = {
  TALK_ASSIGNED_FOR_REVIEW: 'TALK_ASSIGNED_FOR_REVIEW',
  SPEAKER_REGISTERED: 'SPEAKER_REGISTERED',
  SPEAKER_PROFILE_UPDATED: 'SPEAKER_PROFILE_UPDATED',
  TALK_PROPOSED: 'TALK_PROPOSED',
}

export type DomainEventCode = (typeof DomainEventCode)[keyof typeof DomainEventCode]
