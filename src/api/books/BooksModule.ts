import { Module } from '@nestjs/common'
import AppProviders from '../../AppProviders'
import AddBook from '../../application/books/use-cases/AddBook'
import FindBookByUuid from '../../application/books/use-cases/FindBookByUuid'
import BookRepositoryPostgres from '../../application/books/infrastructure/repositories/BookRepositoryPostgres'
import BooksController from './BooksController'

const useCases = [AddBook, FindBookByUuid]

@Module({
  controllers: [BooksController],
  providers: [
    {
      provide: AppProviders.BOOK_REPOSITORY,
      useClass: BookRepositoryPostgres,
    },
    ...useCases,
  ],
})
export default class BooksModule {}
