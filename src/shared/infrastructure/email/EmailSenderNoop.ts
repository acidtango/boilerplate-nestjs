import { EmailSender, ThanksForTheProposal } from '../../domain/services/EmailSender'

export class EmailSenderNoop implements EmailSender {
  async sendThanksForProposal(email: ThanksForTheProposal): Promise<void> {}
}
