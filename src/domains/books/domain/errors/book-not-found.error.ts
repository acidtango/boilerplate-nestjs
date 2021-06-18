import DomainErrorCode from '../../../../shared/domain/errors/domain-error-code.domain'
import DomainError from '../../../../shared/domain/errors/domain.error'
import BookNotFoundKey from './book-not-found-key.enum'

export default class BookNotFoundError extends DomainError {
  constructor(key: BookNotFoundKey, value: string) {
    super(`Book with ${key} ${value} not found`, DomainErrorCode.BOOK_NOT_FOUND_ERROR)
  }
}
