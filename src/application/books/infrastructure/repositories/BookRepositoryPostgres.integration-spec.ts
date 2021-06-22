import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import Book from '../../domain/Book'
import Genre from '../../domain/types/Genre'
import BookEntityPostgres from '../entities/BookEntityPostgres'
import BookRepositoryPostgres from './BookRepositoryPostgres'

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
describe.skip('BookRepositoryPostgres', () => {
  let fakeBookRepository: BookRepositoryPostgres
  let saveSpy: jest.SpyInstance
  let updateSpy: jest.SpyInstance

  const typeormRepositoryMock = {
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookRepositoryPostgres,
        {
          provide: getRepositoryToken(BookEntityPostgres),
          useValue: typeormRepositoryMock,
        },
      ],
    }).compile()
    fakeBookRepository = module.get<BookRepositoryPostgres>(BookRepositoryPostgres)

    jest.clearAllMocks()
    saveSpy = jest.spyOn(typeormRepositoryMock, 'save')
    updateSpy = jest.spyOn(typeormRepositoryMock, 'update')
  })

  it('should be defined', () => {
    expect(fakeBookRepository).toBeDefined()
  })

  describe('save', () => {
    it('should save a new book', async () => {
      await fakeBookRepository.save(FAKE_BOOK)

      expect(saveSpy).toHaveBeenCalledWith(BookEntityPostgres.fromDomainObject(FAKE_BOOK))
    })
  })
  describe('findByUuid', () => {
    it('should find a book by uuid', async () => {
      typeormRepositoryMock.findOne.mockResolvedValueOnce(
        BookEntityPostgres.fromDomainObject(FAKE_BOOK)
      )
      const result = await fakeBookRepository.findByUuid(FAKE_UUID)
      expect(result).toEqual(FAKE_BOOK)
    })
    it('should return undefined if not book is found', async () => {
      typeormRepositoryMock.findOne.mockResolvedValueOnce(undefined)
      const result = await fakeBookRepository.findByUuid('WRONG_UUID')
      expect(result).toBeUndefined()
    })
  })
  describe('findByIsbn', () => {
    it('should find a book by isbn', async () => {
      typeormRepositoryMock.findOne.mockResolvedValueOnce(
        BookEntityPostgres.fromDomainObject(FAKE_BOOK)
      )
      const result = await fakeBookRepository.findByIsbn(FAKE_ISBN)
      expect(result).toEqual(FAKE_BOOK)
    })
    it('should return undefined if not book is found', async () => {
      typeormRepositoryMock.findOne.mockResolvedValueOnce(undefined)
      const result = await fakeBookRepository.findByUuid('WRONG_ISBN')

      expect(result).toBeUndefined()
    })
  })
  describe('update', () => {
    it('should update a book', async () => {
      await fakeBookRepository.update(FAKE_BOOK)

      expect(updateSpy).toHaveBeenCalledWith(
        FAKE_UUID,
        BookEntityPostgres.fromDomainObject(FAKE_BOOK)
      )
    })
  })
})
