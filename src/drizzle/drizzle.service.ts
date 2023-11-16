import { DbConfig } from '@/config/db.config';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

@Injectable()
export class DrizzleService {
    constructor(@Inject(DbConfig.KEY)
    private dbConfig: ConfigType<typeof DbConfig>){}

    async dbMigrate(path = './migrations') {
        const sql = postgres(this.dbConfig.prodDatabaseUrl, { max: 1 });

        await migrate(drizzle(sql), {
            migrationsFolder: path,
            migrationsTable: 'migrations',
          });
    }
}
