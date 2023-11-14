import { Global, Module } from '@nestjs/common';
import { DB, DbProvider } from './drizzle.provider';

@Global()
@Module({
  providers: [DbProvider],
  exports: [DB],
})
export class DrizzleModule {}
