import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/drizzle/schema.ts',
  driver: 'pg',
  out: './migrations',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  },
  verbose: true,
  strict: true,
});
