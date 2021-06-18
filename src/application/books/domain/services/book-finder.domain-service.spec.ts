import BookRepositoryFake from '../../infrastructure/repositories/book.repository.fake'
import Book from '../book.domain'
import BookRepository from '../book.repository.interface'
import BookNotFoundKey from '../errors/book-not-found-key.enum'
import BookNotFoundError from '../errors/book-not-found.error'
import Genre from '../types/genre.enum'
import BookFinder from './book-finder.domain-service'

const FAKE_UUID = '225cf7b7-3555-43e8-9bea-cbba0d296677'
const FAKE_TITLE = 'Fake Title'
const FAKE_ISBN = '978-0321125217'
const FAKE_GENRE = Genre.FANTASY
const FAKE_NUMBER_OF_PAGES = 560
const FAKE_BOOK = new Book({
  uuid: FAKE_UUID,
  title: FAKE_TITLE,
  isbn: FAKE_ISBN,
  genre: FAKE_GENRE,
  numberOfPages: FAKE_NUMBER_OF_PAGES,
})

describe('BookFinder', () => {
  let bookRepository: BookRepository
  let bookFinderService: BookFinder
  beforeEach(async () => {
    bookRepository = new BookRepositoryFake()
    bookFinderService = new BookFinder(bookRepository)
  })

  describe('findByUuid', () => {
    it('returns the book if its found', async () => {
      bookRepository.findByUuid = jest.fn().mockReturnValueOnce(FAKE_BOOK)
      const book = await bookFinderService.findByUuid(FAKE_UUID)
      expect(book).toEqual(FAKE_BOOK)
    })
    it('throws an error if book is not found', async () => {
      bookRepository.findByUuid = jest.fn().mockReturnValueOnce(undefined)

      await expect(bookFinderService.findByUuid(FAKE_UUID)).rejects.toThrowError(
        new BookNotFoundError(BookNotFoundKey.UUID, FAKE_UUID)
      )
    })
  })
  describe('findByIsbn', () => {
    it('returns the book if its found', async () => {
      bookRepository.findByIsbn = jest.fn().mockReturnValueOnce(FAKE_BOOK)
      const book = await bookFinderService.findByIsbn(FAKE_ISBN)
      expect(book).toEqual(FAKE_BOOK)
    })
    it('throws an error if book is not found', async () => {
      bookRepository.findByIsbn = jest.fn().mockReturnValueOnce(undefined)

      await expect(bookFinderService.findByIsbn(FAKE_ISBN)).rejects.toThrowError(
        new BookNotFoundError(BookNotFoundKey.ISBN, FAKE_ISBN)
      )
    })
  })
})
