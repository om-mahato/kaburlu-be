import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/drizzle/schema.ts',
  driver: 'pg',
  out: './src/drizzle/migrations',
  dbCredentials: {
    connectionString: process.env.PROD_DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
