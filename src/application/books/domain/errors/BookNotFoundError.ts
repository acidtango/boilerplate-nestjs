import DomainErrorCode from '../../../../shared/domain/errors/DomainErrorCode'
import DomainError from '../../../../shared/domain/errors/DomainError'
import BookNotFoundKey from './BookNotFoundKey'

export default class BookNotFoundError extends DomainError {
  constructor(key: BookNotFoundKey, value: string) {
    super(`Book with ${key} ${value} not found`, DomainErrorCode.BOOK_NOT_FOUND_ERROR)
  }
}
