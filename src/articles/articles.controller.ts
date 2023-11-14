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
import { Article, ArticlesService, NewArticle } from './articles.service';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiOperation({ summary: 'Create new article' })
  async create(@Body() createArticleDto: NewArticle) {
    const article = await this.articlesService.create(createArticleDto);
    return article;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all article' })
  async find() {
    const articles = await this.articlesService.find();
    return articles;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find article by id' })
  @Get(':id')
  async findById(@Param() id: Article['id']) {
    const article = await this.articlesService.findById(id);
    return article;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update article by id' })
  @Put(':id')
  async update(
    @Param() id: Article['id'],
    @Body() updateArticleDto: Partial<NewArticle>,
  ) {
    const article = await this.articlesService.update(id, updateArticleDto);
    return article;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an article' })
  @Delete(':id')
  async delete(@Param() id: Article['id']) {
    await this.articlesService.delete(id);
    return { deleted: true };
  }
}
