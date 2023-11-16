import { Global, Module } from '@nestjs/common';
import { DB, DbProvider } from './drizzle.provider';
// import { DrizzleService } from './drizzle.service';

@Global()
@Module({
  providers: [DbProvider],
  exports: [DB],
})
export class DrizzleModule {}
