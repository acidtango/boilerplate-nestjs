import { UseCase } from '../../../shared/domain/hex/UseCase'
import { TalkId } from '../domain/TalkId'
import { OrganizerId } from '../../../shared/domain/ids/OrganizerId'

export type CreateTalkParams = {
  id: TalkId
  reviewerId: OrganizerId
}

export class ReviewTalk extends UseCase {
  async execute({ id, reviewerId }: CreateTalkParams) {
    throw new Error('Unimplemented method ')
  }
}
