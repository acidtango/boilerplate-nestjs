import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import AddBook from '../../application/books/use-cases/add-book.usecase'
import FindBookByUuid from '../../application/books/use-cases/find-book-by-uuid.usecase'
import GenericErrorResponseDto from '../../shared/dtos/generic-error-response.dto'
import CreateBookDto from './dtos/create-book.dto'
import GetBookResponseDto from './dtos/get-book-response.dto'
import SaveBookResponseDto from './dtos/save-book-response.dto'

@ApiTags('Books')
@Controller('books')
export default class BooksController {
  constructor(private readonly addBook: AddBook, private readonly findBookByUuid: FindBookByUuid) {}

  @ApiOperation({ summary: 'Creates a new book' })
  @ApiBody({ type: CreateBookDto })
  @Post()
  async createBook(@Body() body: CreateBookDto): Promise<SaveBookResponseDto> {
    const book = await this.addBook.execute(body)
    return new SaveBookResponseDto(book)
  }

  @ApiOperation({ summary: 'Get a book given its uuid' })
  @ApiOkResponse({ description: 'Returns the book', type: GetBookResponseDto })
  @ApiNotFoundResponse({
    description: 'The book with the given uuid was not found',
    type: GenericErrorResponseDto,
  })
  @Get('/:uuid')
  async getBookByUuid(@Param('uuid') uuid: string): Promise<GetBookResponseDto> {
    const book = await this.findBookByUuid.execute({ uuid })
    return new GetBookResponseDto(book)
  }
}
