import { registerAs } from '@nestjs/config';

export const DbConfig = registerAs('db', () => ({
  prodDatabaseUrl: `${process.env.DATABASE_URL}?sslmode=require`,
  devDatabaseUrl: process.env.DEV_DATABASE_URL,
}));
