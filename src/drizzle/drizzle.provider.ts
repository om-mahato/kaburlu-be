import { drizzle } from 'drizzle-orm/postgres-js';
import * as postgres from 'postgres';
import appConfig from 'src/config/app.config';
import * as schema from './schema';

export const DRIZZLE_ASYNC_PROVIDER = 'drizzleProvider';

export const drizzleProvider = [
  {
    provide: DRIZZLE_ASYNC_PROVIDER,
    useFactory: async () => {
      const queryClient = postgres(appConfig().databaseUrl);
      const db = drizzle(queryClient, {
        schema,
        logger: true,
      });
      return db;
    },
    exports: [DRIZZLE_ASYNC_PROVIDER],
  },
];
