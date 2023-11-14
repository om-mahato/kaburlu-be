import { registerAs } from '@nestjs/config';

export const DbConfig = registerAs('db', () => ({
  prodDatabaseUrl: process.env.DATABASE_URL,
  devDatabaseUrl: process.env.DEV_DATABASE_URL,
}));
