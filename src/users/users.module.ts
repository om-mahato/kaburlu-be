import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, JwtService],
  exports: [UsersService],
})
export class UsersModule {}
