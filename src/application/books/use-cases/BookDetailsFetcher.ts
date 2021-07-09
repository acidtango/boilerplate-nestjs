import { Inject, Injectable } from '@nestjs/common'
import AppProviders from '../../../AppProviders'
import UseCase from '../../../shared/domain/UseCase'
import Book from '../domain/Book'
import BookRepository from '../domain/BookRepository'
import BookFinder from '../domain/services/BookFinder'

@Injectable()
export default class BookDetailsFetcher implements UseCase<{ uuid: string }, Book> {
  private bookFinder: BookFinder

  constructor(
    @Inject(AppProviders.BOOK_REPOSITORY) private readonly bookRepository: BookRepository
  ) {
    this.bookFinder = new BookFinder(this.bookRepository)
  }

  async execute({ uuid }: { uuid: string }): Promise<Book> {
    return this.bookFinder.findByUuid(uuid)
  }
}
