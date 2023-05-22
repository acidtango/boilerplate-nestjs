import { Speaker } from '../../../speakers/domain/models/Speaker'

export class ThanksForTheProposal {
  constructor(private readonly speaker: Speaker) {}
}

export interface EmailSender {
  sendThanksForProposal(email: ThanksForTheProposal): Promise<void>
}
