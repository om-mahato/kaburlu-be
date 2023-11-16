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
import { CategoriesService, Category, NewCategory } from './categories.service';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiOperation({ summary: 'Create new article' })
  async create(@Body() createTagDto: NewCategory, @User() user: UserEntity) {
    const article = await this.categoriesService.create({
      ...createTagDto,
      tenantId: user.tenantId,
    });
    return article;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all public article' })
  @Get('public')
  async findPublic() {
    const categories = await this.categoriesService.findPublic();
    return categories;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find article by id' })
  @Get(':id/public')
  async findByIdPublic(@Param() id: Category['id']) {
    const article = await this.categoriesService.findByIdPublic(id);
    return article;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all article' })
  async find(@User() user: UserEntity) {
    const categories = await this.categoriesService.find(user);
    return categories;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find article by id' })
  @Get(':id')
  async findById(@Param() id: Category['id'], @User() user: UserEntity) {
    const article = await this.categoriesService.findById(id, user);
    return article;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update article by id' })
  @Put(':id')
  async update(
    @Param() id: Category['id'],
    @Body() updateTagDto: Partial<NewCategory>,
    @User() user: UserEntity,
  ) {
    const article = await this.categoriesService.update(id, user, updateTagDto);
    return article;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an article' })
  @Delete(':id')
  async delete(@Param() id: Category['id'], @User() user: UserEntity) {
    await this.categoriesService.delete(id, user);
    return { deleted: true };
  }
}
