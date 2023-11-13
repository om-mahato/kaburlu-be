import { createId } from '@paralleldrive/cuid2';
import { timestamp, varchar } from 'drizzle-orm/pg-core';
import { tenants } from './schema';

export const defaultColumns = {
  id: varchar('id')
    .notNull()
    .$defaultFn(() => createId()),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
};

export const defaultTenantColumns = {
  id: varchar('id')
    .notNull()
    .$defaultFn(() => createId()),
  tenantId: varchar('tenant_id')
    .references(() => tenants.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
};
