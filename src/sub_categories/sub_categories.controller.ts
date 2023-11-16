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
import { CreateSubCategoryDto } from './sub_categories.dto';
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
  @ApiOperation({ summary: 'Create new sub-category' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createTagDto: CreateSubCategoryDto,
    @User() user: UserEntity,
  ) {
    const subCategory = await this.subCategoriesService.create({
      ...createTagDto,
      tenantId: user.tenantId,
    });
    return subCategory;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all public sub_category' })
  @Get('public')
  async findPublic() {
    const categories = await this.subCategoriesService.findPublic();
    return categories;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all sub_category' })
  @UseGuards(AuthGuard)
  async find(@User() user: UserEntity) {
    const categories = await this.subCategoriesService.find(user);
    return categories;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find sub-category by id' })
  @ApiParam({
    name: 'id',
    description: 'id of the sub-category',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param() id: SubCategory['id'], @User() user: UserEntity) {
    const subCategory = await this.subCategoriesService.findById(id, user);
    return subCategory;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update sub-category by id' })
  @ApiParam({
    name: 'id',
    description: 'id of the sub-category',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param() id: SubCategory['id'],
    @Body() updateTagDto: Partial<NewSubCategory>,
    @User() user: UserEntity,
  ) {
    const subCategory = await this.subCategoriesService.update(
      id,
      user,
      updateTagDto,
    );
    return true;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an sub_category' })
  @ApiParam({
    name: 'id',
    description: 'id of the sub-category',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param() id: SubCategory['id'], @User() user: UserEntity) {
    await this.subCategoriesService.delete(id, user);
    return { deleted: true };
  }
}
