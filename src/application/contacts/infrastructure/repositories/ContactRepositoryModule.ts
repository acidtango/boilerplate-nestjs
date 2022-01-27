import { Global, Module } from '@nestjs/common'
import { CONTACT_REPOSITORY_TOKEN } from '../../domain/ContactRepository'
import { ContactRepositoryMemory } from './ContactRepositoryMemory'

@Global()
@Module({
  exports: [CONTACT_REPOSITORY_TOKEN],
  providers: [
    {
      provide: CONTACT_REPOSITORY_TOKEN,
      useClass: ContactRepositoryMemory,
    },
  ],
})
export class ContactRepositoryModule {}
