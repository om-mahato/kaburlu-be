import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SubCategoriesController } from './sub_categories.controller';
import { SubCategoriesService } from './sub_categories.service';

@Module({
  controllers: [SubCategoriesController],
  providers: [SubCategoriesService, JwtService],
})
export class SubCategoriesModule {}
