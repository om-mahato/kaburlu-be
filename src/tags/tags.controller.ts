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
import { NewTag, Tag, TagsService } from './tags.service';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiOperation({ summary: 'Create new article' })
  async create(@Body() createTagDto: NewTag, @User() user: UserEntity) {
    const article = await this.tagsService.create({
      ...createTagDto,
      tenantId: user.tenantId,
    });
    return article;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all public article' })
  @Get('public')
  async findPublic() {
    const tags = await this.tagsService.findPublic();
    return tags;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find article by id' })
  @Get(':id/public')
  async findByIdPublic(@Param() id: Tag['id']) {
    const article = await this.tagsService.findByIdPublic(id);
    return article;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all article' })
  async find(@User() user: UserEntity) {
    const tags = await this.tagsService.find(user);
    return tags;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find article by id' })
  @Get(':id')
  async findById(@Param() id: Tag['id'], @User() user: UserEntity) {
    const article = await this.tagsService.findById(id, user);
    return article;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update article by id' })
  @Put(':id')
  async update(
    @Param() id: Tag['id'],
    @Body() updateTagDto: Partial<NewTag>,
    @User() user: UserEntity,
  ) {
    const article = await this.tagsService.update(id, user, updateTagDto);
    return article;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an article' })
  @Delete(':id')
  async delete(@Param() id: Tag['id'], @User() user: UserEntity) {
    await this.tagsService.delete(id, user);
    return { deleted: true };
  }
}
