import { TalkStatus } from './TalkStatus'
import { TalkId } from './TalkId'
import { Primitives } from '../../../utils/Primitives'

export type TalkPrimitives = Primitives<Talk>

export class Talk {
  constructor(private readonly id: TalkId) {}

  static fromPrimitives(talkPrimitives: TalkPrimitives) {
    return new Talk(TalkId.fromPrimitives(talkPrimitives.id))
  }

  getStatus() {
    return TalkStatus.PROPOSAL
  }

  toPrimitives() {
    return {
      id: this.id.toPrimitives(),
    }
  }
}
