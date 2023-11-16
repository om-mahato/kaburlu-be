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
  create(
    @Body() createCategoriesDto: NewSubCategories,
    @User() user: UserEntity,
  ) {
    return this.subCategoriesService.create({
      ...createCategoriesDto,
      tenantId: user.tenantId,
    });
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all article' })
  find(@User() user: UserEntity) {
    return this.subCategoriesService.find(user.tenantId);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find article by id' })
  findById(@Req() id: SubCategories['id'], @User() user: UserEntity) {
    return this.subCategoriesService.findById(id, user.tenantId);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update article by id' })
  @Put()
  update(
    @Req() id: SubCategories['id'],
    @Body() updateCategoriesDto: Partial<NewSubCategories>,
    @User() user: UserEntity,
  ) {
    return this.subCategoriesService.update(
      id,
      user.tenantId,
      updateCategoriesDto,
    );
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an article' })
  @Delete()
  delete(@Req() id: SubCategories['id'], @User() user: UserEntity) {
    return this.subCategoriesService.delete(id, user.tenantId);
  }
}
