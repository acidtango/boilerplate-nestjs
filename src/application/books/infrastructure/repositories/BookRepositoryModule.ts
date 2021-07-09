import { Module } from '@nestjs/common'
import BookRepositoryPostgres from './BookRepositoryPostgres'
import AppProviders from '../../../../AppProviders'

@Module({
  providers: [
    {
      provide: AppProviders.BOOK_REPOSITORY,
      useClass: BookRepositoryPostgres,
    },
  ],
  exports: [AppProviders.BOOK_REPOSITORY],
})
export default class BookRepositoryModule {}
