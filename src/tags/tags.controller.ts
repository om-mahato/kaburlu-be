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
  create(@Body() createTagDto: NewTag) {
    return this.tagsService.create(createTagDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all article' })
  find() {
    return this.tagsService.find();
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find article by id' })
  findById(@Req() id: Tag['id']) {
    return this.tagsService.findById(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update article by id' })
  @Put()
  update(@Req() id: Tag['id'], @Body() updateTagDto: Partial<NewTag>) {
    return this.tagsService.update(id, updateTagDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an article' })
  @Delete()
  delete(@Req() id: Tag['id']) {
    return this.tagsService.delete(id);
  }
}
