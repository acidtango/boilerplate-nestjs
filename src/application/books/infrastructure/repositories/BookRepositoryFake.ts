import Book from '../../domain/Book'
import BookRepository from '../../domain/BookRepository'

export default class BookRepositoryFake implements BookRepository {
  constructor(private readonly repository: Book[] = []) {}

  async save(book: Book): Promise<void> {
    this.repository.push(book)
  }

  async update(book: Book): Promise<void> {
    this.repository.map((element) => (element.uuid === book.uuid ? book : element))
  }

  async findByUuid(uuid: string): Promise<Book | undefined> {
    return this.repository.find((book) => book.uuid === uuid)
  }

  async findByIsbn(isbn: string): Promise<Book | undefined> {
    return this.repository.find((book) => book.isbn === isbn)
  }
}
