import { Module } from '@nestjs/common';
import { drizzleProvider } from 'src/drizzle/drizzle.provider';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  controllers: [TagsController],
  providers: [TagsService, ...drizzleProvider],
})
export class TagsModule {}
