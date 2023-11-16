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
import { CreateTagDto } from './tags.dto';
import { NewTag, Tag, TagsService } from './tags.service';

@ApiTags('tags')
@Controller('tags')
@ApiBearerAuth()
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new tag' })
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createTagDto: CreateTagDto, @User() user: UserEntity) {
    const tag = await this.tagsService.create({
      ...createTagDto,
      tenantId: user.tenantId,
    });
    return tag;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all public tags' })
  @Get('public')
  async findPublic() {
    const tags = await this.tagsService.findPublic();
    return tags;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all tag' })
  @UseGuards(AuthGuard)
  async find(@User() user: UserEntity) {
    const tags = await this.tagsService.find(user);
    return tags;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find tag by id' })
  @ApiParam({
    name: 'id',
    description: 'id of the tag',
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param() id: Tag['id'], @User() user: UserEntity) {
    const tag = await this.tagsService.findById(id, user);
    return tag;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update tag by id' })
  @ApiParam({
    name: 'id',
    description: 'id of the tag',
  })
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param() id: Tag['id'],
    @Body() updateTagDto: Partial<NewTag>,
    @User() user: UserEntity,
  ) {
    const tag = await this.tagsService.update(id, user, updateTagDto);
    return tag;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an tag' })
  @ApiParam({
    name: 'id',
    description: 'id of the tag',
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param() id: Tag['id'], @User() user: UserEntity) {
    await this.tagsService.delete(id, user);
    return { deleted: true };
  }
}
