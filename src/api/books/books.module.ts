import { Module } from '@nestjs/common'
import AppProviders from '../../app.providers'
import AddBook from '../../application/books/use-cases/add-book.usecase'
import FindBookByUuid from '../../application/books/use-cases/find-book-by-uuid.usecase'
import BookRepositoryPostgres from '../../application/books/infrastructure/repositories/book.repository.postgres'
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
