import { DbConfig } from '@/config/db.config';
import { FactoryProvider, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { DefaultLogger, LogWriter } from 'drizzle-orm';
import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import * as postgres from 'postgres';
import * as schema from './schema';

export const DB = Symbol('DB_SERVICE');
export type DbType = PostgresJsDatabase<typeof schema>;

export const DbProvider: FactoryProvider = {
  provide: DB,
  inject: [DbConfig.KEY],
  useFactory: async (dbConfig: ConfigType<typeof DbConfig>) => {
    const logger = new Logger('DB');
    logger.debug('Connecting to Postgres...');

    const queryClient = postgres(dbConfig.prodDatabaseUrl);

    logger.debug('Connected to Postgres!');

    class CustomDbLogWriter implements LogWriter {
      write(message: string) {
        logger.verbose(message);
      }
    }

    const db = drizzle(queryClient, {
      schema,
      logger: new DefaultLogger({ writer: new CustomDbLogWriter() }),
    });

    return db;
  },
};
