import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsISBN, IsPositive, Length } from 'class-validator'
import Genre from '../../../application/books/domain/types/genre.enum'

export default class CreateBookDto {
  @ApiProperty({ description: 'Title of the book', example: 'Domain-Driven Design', maxLength: 36 })
  @Length(0, 36)
  title!: string

  @ApiProperty({
    description: 'ISBN for the book',
    example: '978-0321125217',
  })
  @IsISBN()
  isbn!: string

  @ApiProperty({
    description: 'Number of pages (minimum of 1)',
    minimum: 1,
    example: 568,
  })
  @IsPositive()
  numberOfPages!: number

  @ApiProperty({
    description: 'Genre of the book',
    enum: Genre,
    example: Genre.FANTASY,
  })
  @IsEnum(Genre)
  genre!: Genre
}
