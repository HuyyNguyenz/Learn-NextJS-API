import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateBlogDto } from './dto'
import { BLOG_MESSAGES } from 'src/constant/message'
import { EditBlogDto } from './dto/edit-blog-dto'

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}
  async createBlog(dto: CreateBlogDto) {
    const blog = await this.prisma.blog.create({ data: { ...dto } })
    return {
      message: BLOG_MESSAGES.CREATE_BLOG_SUCCESS,
      blog
    }
  }
  async getBlogs() {
    const blogs = await this.prisma.blog.findMany()
    return {
      message: BLOG_MESSAGES.GET_BLOGS_SUCCESS,
      blogs
    }
  }
  async editBlog(id: number, dto: EditBlogDto) {
    try {
      const blog = await this.prisma.blog.update({
        where: {
          id
        },
        data: { ...dto }
      })
      return {
        message: BLOG_MESSAGES.UPDATE_BLOG_SUCCESS,
        blog
      }
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(BLOG_MESSAGES.ID_BLOG_NOT_FOUND)
      }
      throw error
    }
  }
  async deleteBlog(id: number) {
    try {
      await this.prisma.blog.delete({
        where: {
          id
        }
      })
      return {
        message: BLOG_MESSAGES.DELETE_BLOG_SUCCESS
      }
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(BLOG_MESSAGES.ID_BLOG_NOT_FOUND)
      }
      throw error
    }
  }
}
