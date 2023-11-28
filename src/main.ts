import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
// import { FakerService } from './faker/faker.service'
// import { PrismaService } from './prisma/prisma.service'
// import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )
  app.enableCors({ origin: process.env.CLIENT_URL as string })
  await app.listen(process.env.PORT)
  // Fake data
  /**
    const config = new ConfigService()
    const prisma = new PrismaService(config)
    const fakerService = new FakerService(prisma)
    const result = await fakerService.initData()
    console.log(result)
   */
  console.log(`Server is running at http://localhost:${process.env.PORT}`)
}
bootstrap()
