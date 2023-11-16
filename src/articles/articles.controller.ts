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
import { slugify } from 'transliteration';
import { CreateArticleDto } from './article.dto';
import {
  ArticlesService,
  type Article,
  type NewArticle,
} from './articles.service';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new article' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createArticleDto: CreateArticleDto,
    @User() user: UserEntity,
  ) {
    const article = await this.articlesService.create({
      ...createArticleDto,
      slug: slugify(createArticleDto.title),
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
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async find(@User() user: UserEntity) {
    const articles = await this.articlesService.find(user);
    return articles;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find article by id' })
  @ApiParam({
    name: 'id',
    description: 'id of the article',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param() id: Article['id'], @User() user: UserEntity) {
    const article = await this.articlesService.findById(id, user);
    return article;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update article by id' })
  @ApiParam({
    name: 'id',
    description: 'id of the article',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
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
  @ApiParam({
    name: 'id',
    description: 'id of the article',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param() id: Article['id'], @User() user: UserEntity) {
    await this.articlesService.delete(id, user);
    return { deleted: true };
  }
}
