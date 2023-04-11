import { UseCase } from '../../../shared/domain/hex/UseCase'
import { TalkEvent } from '../domain/TalkEvent'

export class ListEvents extends UseCase {
  async execute(): Promise<TalkEvent[]> {
    return []
  }
}
