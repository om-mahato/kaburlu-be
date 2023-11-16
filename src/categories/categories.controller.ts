import { UserEntity } from '@/auth/auth.service';
import { User } from '@/user.decorator';
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
  create(@Body() createCategoriesDto: NewCategory, @User() user: UserEntity) {
    return this.categoriesService.create({
      ...createCategoriesDto,
      tenantId: user.tenantId,
    });
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all article' })
  find(@User() user: UserEntity) {
    return this.categoriesService.find(user.tenantId);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find article by id' })
  findById(@Req() id: Category['id'], @User() user: UserEntity) {
    return this.categoriesService.findById(id, user.tenantId);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update article by id' })
  @Put()
  update(
    @Req() id: Category['id'],
    @Body() updateCategoriesDto: Partial<NewCategory>,
    @User() user: UserEntity,
  ) {
    return this.categoriesService.update(
      id,
      user.tenantId,
      updateCategoriesDto,
    );
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an article' })
  @Delete()
  delete(@Req() id: Category['id'], @User() user: UserEntity) {
    return this.categoriesService.delete(id, user.tenantId);
  }
}
