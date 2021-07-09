import { Module } from '@nestjs/common'
import BookDetailsFetcher from '../../application/books/use-cases/BookDetailsFetcher'
import BookInsertionCreator from '../../application/books/use-cases/BookInsertionCreator'
import BookRepositoryModule from '../../application/books/infrastructure/repositories/BookRepositoryModule'
import BooksController from './BooksController'

const useCases = [BookInsertionCreator, BookDetailsFetcher]

@Module({
  imports: [BookRepositoryModule],
  controllers: [BooksController],
  providers: [...useCases],
})
export default class BooksModule {}
