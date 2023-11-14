import { registerAs } from '@nestjs/config';

export const DbConfig = registerAs('db', () => ({
  prodDatabaseUrl: process.env.PROD_DATABASE_URL,
  devDatabaseUrl: process.env.DEV_DATABASE_URL,
}));
