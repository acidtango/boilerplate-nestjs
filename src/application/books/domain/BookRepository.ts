import Book from './Book'

export default interface BookRepository {
  save(book: Book): Promise<void>

  update(book: Book): Promise<void>

  findByUuid(uuid: string): Promise<Book | undefined>

  findByIsbn(isbn: string): Promise<Book | undefined>
}
