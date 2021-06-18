import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import Book from '../../domain/book.domain'
import BookRepository from '../../domain/book.repository.interface'
import BookEntityPostgres from '../entities/book.entity.postgres'

export default class BookRepositoryPostgres implements BookRepository {
  private repository: Repository<BookEntityPostgres>

  constructor(
    @InjectRepository(BookEntityPostgres)
    repository: Repository<BookEntityPostgres>
  ) {
    this.repository = repository
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
