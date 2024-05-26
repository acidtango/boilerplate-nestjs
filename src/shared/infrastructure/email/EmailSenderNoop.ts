import { EmailSender, ThanksForTheProposal } from '../../domain/services/EmailSender'

export class EmailSenderNoop implements EmailSender {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async sendThanksForProposal(email: ThanksForTheProposal): Promise<void> {}
}
