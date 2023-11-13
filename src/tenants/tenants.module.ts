import { Module } from '@nestjs/common';
import { drizzleProvider } from 'src/drizzle/drizzle.provider';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';

@Module({
  providers: [TenantsService, ...drizzleProvider],
  controllers: [TenantsController],
  exports: [TenantsService],
})
export class TenantsModule {}
