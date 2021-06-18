import { Inject, Injectable } from '@nestjs/common'
import { v4 as generateUuid } from 'uuid'
import AppProviders from '../../../app.providers'
import UseCase from '../../../shared/domain/use-case.interface'
import Book from '../domain/book.domain'
import BookRepository from '../domain/book.repository.interface'
import Genre from '../domain/types/genre.enum'

@Injectable()
export default class AddBook
  implements UseCase<{ title: string; isbn: string; genre: Genre; numberOfPages: number }, Book>
{
  constructor(
    @Inject(AppProviders.BOOK_REPOSITORY) private readonly bookRepository: BookRepository
  ) {}

  async execute({
    title,
    isbn,
    genre,
    numberOfPages,
  }: {
    title: string
    isbn: string
    genre: Genre
    numberOfPages: number
  }): Promise<Book> {
    const book = new Book({
      uuid: generateUuid(),
      title,
      isbn,
      genre,
      numberOfPages,
    })

    await this.bookRepository.save(book)
    return book
  }
}
