import { IsString, IsNotEmpty } from 'class-validator'

export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  author: string

  @IsNotEmpty()
  @IsString()
  content: string
}
