import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common'

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(value: number, metadata: ArgumentMetadata) {
    if (metadata.type !== 'query') {
      throw new Error('PaginationPipe must be used on query params')
    }
    if (isNaN(value)) {
      throw new BadRequestException(`${metadata.data} must be a number`)
    }
    if (metadata.data === 'limit' && (Number(value) < 1 || Number(value) > 10)) {
      throw new BadRequestException('limit must be between 1 and 10')
    }
    if (metadata.data === 'page' && Number(value) < 1) {
      throw new BadRequestException('page must be greater than 0')
    }
    return Number(value)
  }
}
