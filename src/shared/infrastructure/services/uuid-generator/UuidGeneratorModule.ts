import { Global, Module } from '@nestjs/common'
import { UUID_GENERATOR_TOKEN } from '../../../domain/services/UuidGenerator'
import { UuidGeneratorRandom } from './UuidGeneratorRandom'

@Global()
@Module({
  exports: [UUID_GENERATOR_TOKEN],
  providers: [
    {
      provide: UUID_GENERATOR_TOKEN,
      useClass: UuidGeneratorRandom,
    },
  ],
})
export class UuidGeneratorModule {}
