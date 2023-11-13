import { Module } from '@nestjs/common';
import { drizzleProvider } from 'src/drizzle/drizzle.provider';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService, ...drizzleProvider],
})
export class ArticlesModule {}
