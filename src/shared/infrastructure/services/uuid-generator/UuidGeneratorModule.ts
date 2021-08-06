import { Global, Module } from '@nestjs/common'
import { UUID_GENERATOR_TOKEN } from '../../../domain/services/UuidGenerator'
import { UuidGeneratorDeterministic } from './UuidGeneratorDeterministic'

@Global()
@Module({
  exports: [UUID_GENERATOR_TOKEN],
  providers: [
    {
      provide: UUID_GENERATOR_TOKEN,
      useClass: UuidGeneratorDeterministic,
    },
  ],
})
export class UuidGeneratorModule {}
