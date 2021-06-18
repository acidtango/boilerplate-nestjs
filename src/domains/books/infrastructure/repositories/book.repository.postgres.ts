import { Connection, Repository } from 'typeorm'
import { InjectConnection } from '@nestjs/typeorm'
import Book from '../../domain/book.domain'
import BookRepository from '../../domain/book.repository.interface'
import BookEntityPostgres from '../entities/book.entity.postgres'

export default class BookRepositoryPostgres implements BookRepository {
  private repository: Repository<BookEntityPostgres>

  constructor(@InjectConnection() connection: Connection) {
    this.repository = connection.getRepository(BookEntityPostgres)
  }

  async save(book: Book): Promise<void> {
    await this.repository.save(BookEntityPostgres.fromDomainObject(book))
  }

  async update(book: Book): Promise<void> {
    await this.repository.update(book.uuid, book)
  }

  async findByUuid(uuid: string): Promise<Book | undefined> {
    const entity = await this.repository.findOne(uuid)
    return entity?.toDomainObject()
  }

  async findByIsbn(isbn: string): Promise<Book | undefined> {
    const entity = await this.repository.findOne({ isbn })
    return entity?.toDomainObject()
  }
}
