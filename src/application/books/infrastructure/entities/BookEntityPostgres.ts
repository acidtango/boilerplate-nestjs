import { Column, Entity, Index, PrimaryColumn, Timestamp } from 'typeorm'
import Book from '../../domain/Book'
import Genre from '../../domain/types/Genre'

@Entity('books')
@Index(['isbn'], { unique: true })
export default class BookEntityPostgres {
  @PrimaryColumn({ name: 'uuid', type: 'uuid' })
  uuid!: string

  @Column({ name: 'title', type: 'varchar', length: 36, nullable: false })
  title!: string

  @Column({ name: 'isbn', type: 'varchar', length: 36, nullable: false })
  isbn!: string

  @Column({ name: 'genre', type: 'enum', enum: Genre, nullable: false })
  genre!: Genre

  @Column({ name: 'number_of_pages', type: 'int', nullable: false })
  numberOfPages!: number

  // Audit columns
  @Column({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Timestamp

  @Column({ type: 'varchar', length: 60, name: 'created_by', default: () => 'CURRENT_USER' })
  createdBy!: string

  @Column({ type: 'timestamp', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
  updated!: Timestamp

  @Column({ type: 'varchar', length: 60, name: 'updated_by', default: () => 'CURRENT_USER' })
  updatedBy!: string

  toDomainObject(): Book {
    return new Book({
      uuid: this.uuid,
      title: this.title,
      isbn: this.isbn,
      genre: this.genre,
      numberOfPages: this.numberOfPages,
    })
  }

  static fromDomainObject(book: Book): BookEntityPostgres {
    const bookEntity = new BookEntityPostgres()
    bookEntity.uuid = book.uuid
    bookEntity.title = book.title
    bookEntity.isbn = book.isbn
    bookEntity.genre = book.genre
    bookEntity.numberOfPages = book.numberOfPages

    return bookEntity
  }
}
