import DomainService from '../../../../shared/domain/domain-service.interface'
import Book from '../book.domain'
import BookRepository from '../book.repository.interface'
import BookNotFoundKey from '../errors/book-not-found-key.enum'
import BookNotFoundError from '../errors/book-not-found.error'

export default class BookFinder implements DomainService {
  constructor(private readonly bookRepository: BookRepository) {}

  async findByUuid(uuid: string): Promise<Book> {
    const book = await this.bookRepository.findByUuid(uuid)
    if (!book) throw new BookNotFoundError(BookNotFoundKey.UUID, uuid)

    return book
  }

  async findByIsbn(isbn: string): Promise<Book> {
    const book = await this.bookRepository.findByIsbn(isbn)
    if (!book) throw new BookNotFoundError(BookNotFoundKey.ISBN, isbn)

    return book
  }
}
