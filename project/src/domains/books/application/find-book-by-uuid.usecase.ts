import { Inject, Injectable } from '@nestjs/common'
import AppProviders from '../../../app.providers'
import UseCase from '../../../shared/domain/use-case.interface'
import Book from '../domain/book.domain'
import BookRepository from '../domain/book.repository.interface'
import BookFinder from '../domain/services/book-finder.domain-service'

@Injectable()
export default class FindBookByUuid implements UseCase<{ uuid: string }, Book> {
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
