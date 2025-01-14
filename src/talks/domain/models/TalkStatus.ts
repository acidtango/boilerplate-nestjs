export const TalkStatus = {
  PROPOSAL: 'PROPOSAL',
  REVIEWING: 'REVIEWING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
}

export type TalkStatus = (typeof TalkStatus)[keyof typeof TalkStatus]
