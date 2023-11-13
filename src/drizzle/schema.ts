import { createId } from '@paralleldrive/cuid2';
import { sql } from 'drizzle-orm';
import {
  boolean,
  pgTable,
  primaryKey,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const tenants = pgTable(
  'tenants',
  {
    id: varchar('id')
      .notNull()
      .$defaultFn(() => createId()),
    name: varchar('name', { length: 50 }).notNull(),
    createdAt: timestamp('created_at', { mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
  },
  (tenants) => ({
    primary: primaryKey({
      columns: [tenants.id],
    }),
  }),
);

export const users = pgTable(
  'users',
  {
    id: varchar('id')
      .notNull()
      .$defaultFn(() => createId()),
    tenantId: varchar('tenant_id').references(() => tenants.id, {
      onDelete: 'cascade',
    }),
    name: varchar('name', { length: 50 }),
    email: varchar('email', { length: 50 }),
    password: varchar('password', { length: 255 }),
    phoneNumber: varchar('phone_number', { length: 10 }),
    isVerified: boolean('is_verified').default(false),
    picture: varchar('picture', { length: 255 }),
    createdAt: timestamp('created_at', { mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
  },
  (users) => ({
    primary: primaryKey({
      columns: [users.id],
    }),
  }),
);
