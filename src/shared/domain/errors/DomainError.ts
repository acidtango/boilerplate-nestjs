import { DomainErrorCode } from './DomainErrorCode'

export class DomainError extends Error {
  public readonly code: DomainErrorCode

  constructor(message: string, code: DomainErrorCode) {
    super(message)
    this.code = code
  }
}
