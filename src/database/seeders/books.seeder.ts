/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { Connection, createConnection } from 'typeorm'
import AppConfig from '../../app.config'
import Book from '../../application/books/domain/book.domain'
import Genre from '../../application/books/domain/types/genre.enum'
import BookEntityPostgres from '../../application/books/infrastructure/entities/book.entity.postgres'
import * as ormconfig from '../orm.config'

/**
 * Books seeder only used for development.
 */
export default async function booksSeeder(): Promise<void> {
  if (AppConfig.testModeEnabled) {
    const books = getBooksSeeders()
    const connection = await createConnection(ormconfig)
    await insertIfNotExists(books, connection)
    await connection.close()

    // eslint-disable-next-line no-console
    console.log('-> Books seeder executed successfully')
  }
}

function getBooksSeeders(): BookEntityPostgres[] {
  const book = new Book({
    uuid: '0ed340aa-6ff6-4276-a0eb-2654b6b4e9df',
    title: 'Domain-Driven Design',
    isbn: '978-0321125217',
    genre: Genre.FANTASY,
    numberOfPages: 568,
  })

  return [BookEntityPostgres.fromDomainObject(book)]
}

async function insertIfNotExists(
  books: BookEntityPostgres[],
  connection: Connection
): Promise<void> {
  for (const book of books) {
    const dbBook = await connection.manager.findOne(BookEntityPostgres, {
      uuid: book.uuid,
    })

    if (!dbBook) await connection.manager.save(book)
  }
}
