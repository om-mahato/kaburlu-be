import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// import { dbMigrate } from './drizzle/migrate';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    // await dbMigrate('./src/drizzle/migrations');
    return this.appService.getHello();
  }
}
