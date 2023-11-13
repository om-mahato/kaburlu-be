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
import {
  NewSubCategories,
  SubCategories,
  SubCategoriesService,
} from './sub_categories.service';

@ApiTags('sub-categories')
@Controller('sub-categories')
export class SubCategoriesController {
  constructor(private subCategoriesService: SubCategoriesService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiOperation({ summary: 'Create new article' })
  create(@Body() createCategoriesDto: NewSubCategories) {
    return this.subCategoriesService.create(createCategoriesDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all article' })
  find() {
    return this.subCategoriesService.find();
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find article by id' })
  findById(@Req() id: SubCategories['id']) {
    return this.subCategoriesService.findById(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update article by id' })
  @Put()
  update(
    @Req() id: SubCategories['id'],
    @Body() updateCategoriesDto: Partial<NewSubCategories>,
  ) {
    return this.subCategoriesService.update(id, updateCategoriesDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an article' })
  @Delete()
  delete(@Req() id: SubCategories['id']) {
    return this.subCategoriesService.delete(id);
  }
}
