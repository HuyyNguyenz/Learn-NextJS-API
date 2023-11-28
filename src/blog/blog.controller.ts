import { Body, Controller, Post, Get, Patch, Delete, Param, ParseIntPipe } from '@nestjs/common'
import { CreateBlogDto } from './dto'
import { BlogService } from './blog.service'
import { EditBlogDto } from './dto/edit-blog-dto'

@Controller('blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}
  @Post()
  createBlog(@Body() dto: CreateBlogDto) {
    return this.blogService.createBlog(dto)
  }
  @Get()
  getBlogs() {
    return this.blogService.getBlogs()
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
