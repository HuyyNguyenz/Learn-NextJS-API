import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateBlogDto } from './dto'
import { BLOG_MESSAGES } from 'src/constant/message'
import { EditBlogDto } from './dto'

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}
  async getBlogs(limit: number, page: number) {
    const total_page = Math.ceil((await this.prisma.blog.count()) / limit)
    if (page > total_page) {
      throw new NotFoundException(BLOG_MESSAGES.PAGE_NOT_FOUND)
    }
    const blogs = await this.prisma.blog.findMany({
      skip: (page - 1) * limit,
      take: limit
    })
    return {
      message: BLOG_MESSAGES.GET_BLOGS_SUCCESS,
      blogs,
      page,
      total_page
    }
  }
  async getBlogById(id: number) {
    const blog = await this.prisma.blog.findUnique({
      where: {
        id
      }
    })
    if (!blog) {
      throw new NotFoundException(BLOG_MESSAGES.ID_BLOG_NOT_FOUND)
    }
    return {
      blog
    }
  }
  async createBlog(dto: CreateBlogDto) {
    const blog = await this.prisma.blog.create({ data: { ...dto } })
    return {
      message: BLOG_MESSAGES.CREATE_BLOG_SUCCESS,
      blog
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
