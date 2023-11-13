import { Module } from '@nestjs/common';
import { drizzleProvider } from 'src/drizzle/drizzle.provider';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, ...drizzleProvider],
  exports: [UsersService],
})
export class UsersModule {}
