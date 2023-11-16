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
import { NewTag, Tag, TagsService } from './tags.service';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiOperation({ summary: 'Create new article' })
  create(@Body() createTagDto: NewTag, @User() user: UserEntity) {
    return this.tagsService.create({
      ...createTagDto,
      tenantId: user.tenantId,
    });
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all article' })
  find(@User() user: UserEntity) {
    return this.tagsService.find(user.tenantId);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find article by id' })
  findById(@Req() id: Tag['id'], @User() user: UserEntity) {
    return this.tagsService.findById(id, user.tenantId);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update article by id' })
  @Put()
  update(
    @Req() id: Tag['id'],
    @Body() updateTagDto: Partial<NewTag>,
    @User() user: UserEntity,
  ) {
    return this.tagsService.update(id, user.tenantId, updateTagDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an article' })
  @Delete()
  delete(@Req() id: Tag['id'], @User() user: UserEntity) {
    return this.tagsService.delete(id, user.tenantId);
  }
}
