import DomainErrorCode from './domain-error-code.domain'

export default class DomainError extends Error {
  public readonly code: DomainErrorCode

  constructor(message: string, code: DomainErrorCode) {
    super(message)
    this.code = code
  }
}
