import { Module } from '@nestjs/common'
import { FakerService } from './faker.service'

@Module({
  providers: [FakerService]
})
export class FakerModule {}
