import { AuthGuard } from '@/auth/auth.guard';
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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCategoryDto } from './categories.dto';
import { CategoriesService, Category, NewCategory } from './categories.service';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiOperation({ summary: 'Create new category' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @User() user: UserEntity,
  ) {
    const category = await this.categoriesService.create({
      ...createCategoryDto,
      tenantId: user.tenantId,
    });
    return category;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all public category' })
  @Get('public')
  async findPublic() {
    const categories = await this.categoriesService.findPublic();
    return categories;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all category' })
  @UseGuards(AuthGuard)
  async find(@User() user: UserEntity) {
    const categories = await this.categoriesService.find(user);
    return categories;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find category by id' })
  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'id of the category',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async findById(@Param() id: Category['id'], @User() user: UserEntity) {
    const category = await this.categoriesService.findById(id, user);
    return category;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update category by id' })
  @ApiParam({
    name: 'id',
    description: 'id of the category',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param() id: Category['id'],
    @Body() updateTagDto: Partial<NewCategory>,
    @User() user: UserEntity,
  ) {
    const category = await this.categoriesService.update(
      id,
      user,
      updateTagDto,
    );
    return category;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an category' })
  @ApiParam({
    name: 'id',
    description: 'id of the category',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param() id: Category['id'], @User() user: UserEntity) {
    await this.categoriesService.delete(id, user);
    return { deleted: true };
  }
}
