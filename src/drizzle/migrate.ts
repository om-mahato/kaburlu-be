import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import * as postgres from 'postgres';

const sql = postgres(process.env.PROD_DATABASE_URL!, { max: 1 });

export const dbMigrate = (path = './migrations') =>
  migrate(drizzle(sql), {
    migrationsFolder: path,
    migrationsTable: 'migrations',
  });
