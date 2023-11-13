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
import { Article, ArticlesService, NewArticle } from './articles.service';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiOperation({ summary: 'Create new article' })
  create(@Body() createArticleDto: NewArticle) {
    return this.articlesService.create(createArticleDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all article' })
  find() {
    return this.articlesService.find();
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find article by id' })
  findById(@Req() id: Article['id']) {
    return this.articlesService.findById(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update article by id' })
  @Put()
  update(
    @Req() id: Article['id'],
    @Body() updateArticleDto: Partial<NewArticle>,
  ) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an article' })
  @Delete()
  delete(@Req() id: Article['id']) {
    return this.articlesService.delete(id);
  }
}
