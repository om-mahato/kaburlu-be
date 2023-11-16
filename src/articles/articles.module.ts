import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService, JwtService],
})
export class ArticlesModule {}
