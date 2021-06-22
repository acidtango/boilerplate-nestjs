import Genre from './types/Genre'

export default class Book {
  readonly uuid: string

  title: string

  isbn: string

  numberOfPages: number

  genre: Genre

  constructor({
    uuid,
    title,
    isbn,
    numberOfPages,
    genre,
  }: {
    uuid: string
    title: string
    isbn: string
    numberOfPages: number
    genre: Genre
  }) {
    this.uuid = uuid
    this.title = title
    this.isbn = isbn
    this.numberOfPages = numberOfPages
    this.genre = genre
  }
}
