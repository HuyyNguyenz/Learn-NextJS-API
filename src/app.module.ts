import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { BlogModule } from './blog/blog.module'
import { PrismaModule } from './prisma/prisma.module'
import { FakerModule } from './faker/faker.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    BlogModule,
    PrismaModule,
    FakerModule
  ]
})
export class AppModule {}
