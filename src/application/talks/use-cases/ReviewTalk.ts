import { UseCase } from '../../../shared/domain/hex/UseCase'
import { OrganizerId } from '../../../shared/domain/ids/OrganizerId'
import { TalkId } from '../../../shared/domain/ids/TalkId'

export type CreateTalkParams = {
  id: TalkId
  reviewerId: OrganizerId
}

export class ReviewTalk extends UseCase {
  async execute({ id, reviewerId }: CreateTalkParams) {
    throw new Error('Unimplemented method ')
  }
}
