import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/drizzle/schema.ts',
  driver: 'pg',
  out: './migrations',
  dbCredentials: {
    connectionString: `${process.env.DATABASE_URL}?sslmode=no-verify`,
  },
  verbose: true,
  strict: true,
});
