import { UserEntity } from '@/auth/auth.service';
import { User } from '@/user.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  NewSubCategory,
  SubCategoriesService,
  SubCategory,
} from './sub_categories.service';

@ApiTags('sub-categories')
@Controller('sub-categories')
export class SubCategoriesController {
  constructor(private subCategoriesService: SubCategoriesService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiOperation({ summary: 'Create new article' })
  async create(@Body() createTagDto: NewSubCategory, @User() user: UserEntity) {
    const article = await this.subCategoriesService.create({
      ...createTagDto,
      tenantId: user.tenantId,
    });
    return article;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all public article' })
  @Get('public')
  async findPublic() {
    const categories = await this.subCategoriesService.findPublic();
    return categories;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find article by id' })
  @Get(':id/public')
  async findByIdPublic(@Param() id: SubCategory['id']) {
    const article = await this.subCategoriesService.findByIdPublic(id);
    return article;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all article' })
  async find(@User() user: UserEntity) {
    const categories = await this.subCategoriesService.find(user);
    return categories;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find article by id' })
  @Get(':id')
  async findById(@Param() id: SubCategory['id'], @User() user: UserEntity) {
    const article = await this.subCategoriesService.findById(id, user);
    return article;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update article by id' })
  @Put(':id')
  async update(
    @Param() id: SubCategory['id'],
    @Body() updateTagDto: Partial<NewSubCategory>,
    @User() user: UserEntity,
  ) {
    const article = await this.subCategoriesService.update(
      id,
      user,
      updateTagDto,
    );
    return article;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an article' })
  @Delete(':id')
  async delete(@Param() id: SubCategory['id'], @User() user: UserEntity) {
    await this.subCategoriesService.delete(id, user);
    return { deleted: true };
  }
}
