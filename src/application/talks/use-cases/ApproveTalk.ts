import { Injectable } from '@nestjs/common'
import { UseCase } from '../../../shared/domain/hex/UseCase'
import { TalkStatus } from '../domain/TalkStatus'
import { TalkCannotBeApprovedError } from '../domain/errors/TalkCannotBeApprovedError'
import { Talk } from '../domain/Talk'
import { TalkNotFoundError } from '../domain/errors/TalkNotFoundError'
import { Collection, MongoClient } from 'mongodb'
import { config } from '../../../config'

@Injectable()
export class ApproveTalk extends UseCase {
  private readonly talks: Collection<Talk>

  constructor(private readonly client: MongoClient) {
    super()
    const db = client.db(config.db.database)
    this.talks = db.collection('talks')
  }

  async execute(talkId: string) {
    const talk = await this.talks.findOne({ id: talkId })

    if (!talk) {
      throw new TalkNotFoundError(talkId)
    }

    if (this.getCurrentStatus(talk) === TalkStatus.PROPOSAL) throw new TalkCannotBeApprovedError()

    talk.isApproved = true

    await this.talks.updateOne({ id: talk.id }, { $set: talk }, { upsert: true })
  }

  private getCurrentStatus(talk: Talk) {
    if (talk.isApproved) {
      return TalkStatus.APPROVED
    } else if (talk.isApproved === false) {
      return TalkStatus.REJECTED
    } else if (talk.reviewerId) {
      return TalkStatus.REVIEWING
    } else {
      return TalkStatus.PROPOSAL
    }
  }
}
