import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoriesService, Category, NewCategory } from './categories.service';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiOperation({ summary: 'Create new article' })
  create(@Body() createCategoriesDto: NewCategory) {
    return this.categoriesService.create(createCategoriesDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all article' })
  find() {
    return this.categoriesService.find();
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find article by id' })
  findById(@Req() id: Category['id']) {
    return this.categoriesService.findById(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update article by id' })
  @Put()
  update(
    @Req() id: Category['id'],
    @Body() updateCategoriesDto: Partial<NewCategory>,
  ) {
    return this.categoriesService.update(id, updateCategoriesDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an article' })
  @Delete()
  delete(@Req() id: Category['id']) {
    return this.categoriesService.delete(id);
  }
}
