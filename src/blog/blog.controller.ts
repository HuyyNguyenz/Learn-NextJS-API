import { Body, Controller, Post, Get, Patch, Delete, Param, ParseIntPipe, Query } from '@nestjs/common'
import { CreateBlogDto } from './dto'
import { BlogService } from './blog.service'
import { EditBlogDto } from './dto'
import { PaginationPipe } from 'src/pipes/pagination.pipe'

@Controller('blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}
  @Get()
  getBlogs(@Query('limit', PaginationPipe) limit: number, @Query('page', PaginationPipe) page: number) {
    return this.blogService.getBlogs(limit, page)
  }
  @Get(':id')
  getBlogById(@Param('id', ParseIntPipe) id: number) {
    return this.blogService.getBlogById(id)
  }
  @Post()
  createBlog(@Body() dto: CreateBlogDto) {
    return this.blogService.createBlog(dto)
  }
  @Patch(':id')
  editBlog(@Param('id', ParseIntPipe) id: number, @Body() dto: EditBlogDto) {
    return this.blogService.editBlog(id, dto)
  }
  @Delete(':id')
  deleteBlog(@Param('id', ParseIntPipe) id: number) {
    return this.blogService.deleteBlog(id)
  }
}
