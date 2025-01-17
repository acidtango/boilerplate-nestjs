import type { EmailSender, ThanksForTheProposal } from '../../domain/services/EmailSender.ts'

export class EmailSenderNoop implements EmailSender {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async sendThanksForProposal(email: ThanksForTheProposal): Promise<void> {}
}
