import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  controllers: [TagsController],
  providers: [TagsService, JwtService],
})
export class TagsModule {}
