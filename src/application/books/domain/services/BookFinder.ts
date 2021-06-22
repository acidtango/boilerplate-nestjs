import DomainService from '../../../../shared/domain/DomainService'
import Book from '../Book'
import BookRepository from '../BookRepository'
import BookNotFoundKey from '../errors/BookNotFoundKey'
import BookNotFoundError from '../errors/BookNotFoundError'

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
