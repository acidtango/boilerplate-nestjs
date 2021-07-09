import { Module } from '@nestjs/common'
import AddBook from '../../application/books/use-cases/AddBook'
import FindBookByUuid from '../../application/books/use-cases/FindBookByUuid'
import BooksController from './BooksController'
import BookRepositoryModule from '../../application/books/infrastructure/repositories/BookRepositoryModule'

const useCases = [AddBook, FindBookByUuid]

@Module({
  imports: [BookRepositoryModule],
  controllers: [BooksController],
  providers: [...useCases],
})
export default class BooksModule {}
