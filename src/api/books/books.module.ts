import { Module } from '@nestjs/common'
import AppProviders from '../../app.providers'
import AddBook from '../../domains/books/application/add-book.usecase'
import FindBookByUuid from '../../domains/books/application/find-book-by-uuid.usecase'
import BookRepositoryPostgres from '../../domains/books/infrastructure/repositories/book.repository.postgres'
import BooksController from './books.controller'

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
