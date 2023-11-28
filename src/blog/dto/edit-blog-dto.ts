import { IsString, IsOptional } from 'class-validator'

export class EditBlogDto {
  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  author?: string

  @IsOptional()
  @IsString()
  content?: string
}
