import { Module } from '@nestjs/common';
import { drizzleProvider } from 'src/drizzle/drizzle.provider';
import { SubCategoriesController } from './sub_categories.controller';
import { SubCategoriesService } from './sub_categories.service';

@Module({
  controllers: [SubCategoriesController],
  providers: [SubCategoriesService, ...drizzleProvider],
})
export class SubCategoriesModule {}
