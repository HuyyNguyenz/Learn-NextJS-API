import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { CreateBlogDto } from 'src/blog/dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class FakerService {
  constructor(private prisma: PrismaService) {}
  async initData() {
    const initBlog: () => CreateBlogDto = () => {
      return {
        author: faker.person.fullName(),
        title: faker.lorem.sentences(1),
        content: faker.lorem.paragraphs(1)
      }
    }
    const data: CreateBlogDto[] = faker.helpers.multiple(initBlog, { count: 5 })
    const result = await this.prisma.blog.createMany({
      data
    })
    return {
      message: `Generate ${result.count} item success`
    }
  }
}
