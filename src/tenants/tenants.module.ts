import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';

@Module({
  providers: [TenantsService, JwtService],
  controllers: [TenantsController],
  exports: [TenantsService],
})
export class TenantsModule {}
