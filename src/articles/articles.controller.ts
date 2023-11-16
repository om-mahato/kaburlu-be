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
import { Article, ArticlesService, NewArticle } from './articles.service';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiOperation({ summary: 'Create new article' })
  async create(@Body() createArticleDto: NewArticle, @User() user: UserEntity) {
    const article = await this.articlesService.create({
      ...createArticleDto,
      tenantId: user.tenantId,
    });
    return article;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all public article' })
  @Get('public')
  async findPublic() {
    const articles = await this.articlesService.findPublic();
    return articles;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find article by id' })
  @Get(':id/public')
  async findByIdPublic(@Param() id: Article['id']) {
    const article = await this.articlesService.findByIdPublic(id);
    return article;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all article' })
  async find(@User() user: UserEntity) {
    const articles = await this.articlesService.find(user);
    return articles;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find article by id' })
  @Get(':id')
  async findById(@Param() id: Article['id'], @User() user: UserEntity) {
    const article = await this.articlesService.findById(id, user);
    return article;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update article by id' })
  @Put(':id')
  async update(
    @Param() id: Article['id'],
    @Body() updateArticleDto: Partial<NewArticle>,
    @User() user: UserEntity,
  ) {
    const article = await this.articlesService.update(
      id,
      user,
      updateArticleDto,
    );
    return article;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an article' })
  @Delete(':id')
  async delete(@Param() id: Article['id'], @User() user: UserEntity) {
    await this.articlesService.delete(id, user);
    return { deleted: true };
  }
}
