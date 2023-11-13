import { relations } from 'drizzle-orm';
import {
  boolean,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { defaultColumns, defaultTenantColumns } from './drizzle.utils';

type Require<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type Address = {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
};

export type Location = {
  lat: number;
  lng: number;
} & Partial<Address>;

export type Pic = {
  url: string;
};

export type Vid = {
  url: string;
};

export type SeoInfo = {
  title: string;
  description: string;
  keywords: string[];
};

const domainSchema = z.string().url();
type Domain = z.infer<typeof domainSchema>;

export const tenants = pgTable(
  'tenants',
  {
    ...defaultColumns,
    domain: varchar('domain').$type<Domain>().notNull(),
    language: varchar('language').notNull(),
    rniNumber: varchar('rni_number'),
    publisherName: varchar('publisher_name'),
    publisherContactNumber: varchar('publisher_contact_number'),
    chiefEditorName: varchar('chief_editor_name'),
    contactNumber: varchar('contact_number'),
    circulationState: varchar('circulation_state'),
    address: jsonb('address').$type<Address>().notNull(),
  },
  (tenants) => ({
    primary: primaryKey({
      columns: [tenants.id],
    }),
  }),
);

export const tenantsRelations = relations(tenants, ({ many }) => ({
  users: many(tenants),
}));

export const insertTenantSchema = createInsertSchema(tenants);
export const selectTenantSchema = createSelectSchema(tenants);

const userRole = pgEnum('user_role', [
  'super_admin',
  'admin',
  'editor',
  'reporter',
  'user',
]);

type ExtraUserInfo = {
  fatherName: string;
};

type ReporterRankInfo = {
  beureauInCharge?: string;
  staffReporter?: string;
  rcInCharge?: string;
};

type InfoByRole =
  | {
      level: 'beaureau';
      rank?: never;
    }
  | {
      level: 'staff';
      rank: Require<ReporterRankInfo, 'beureauInCharge'>;
    }
  | {
      level: 'rc';
      rank: Require<ReporterRankInfo, 'beureauInCharge' | 'staffReporter'>;
    }
  | {
      level: 'mandal';
      rank: Require<
        ReporterRankInfo,
        'beureauInCharge' | 'staffReporter' | 'rcInCharge'
      >;
    }
  | {
      level?: never;
      rank?: never;
    };

type UserInfo = InfoByRole & ExtraUserInfo;

const userFields = {
  role: userRole('role').default('user'),
  info: jsonb('extra').$type<UserInfo>(),
  autoPublish: boolean('auto_publish').default(false),
  address: jsonb('address').$type<Address>(),
  idImage: jsonb('id_image').$type<Pic>(),
};

export const users = pgTable(
  'users',
  {
    ...defaultTenantColumns,
    name: varchar('name', { length: 50 }),
    email: varchar('email', { length: 50 }).notNull(),
    password: varchar('password', { length: 255 }),
    phoneNumber: varchar('phone_number', { length: 10 }),
    isVerified: boolean('is_verified').default(false),
    ...userFields,
  },
  (users) => ({
    primary: primaryKey({
      columns: [users.id, users.tenantId],
    }),
    email: uniqueIndex().on(users.tenantId, users.email),
  }),
);

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export const categories = pgTable('categories', {
  ...defaultTenantColumns,
  name: varchar('name').notNull(),
  active: boolean('active').default(true),
  image: jsonb('image').$type<Pic>(),
});

export const subCategories = pgTable('sub_categories', {
  ...defaultTenantColumns,
  name: varchar('name').notNull(),
  active: boolean('active').default(true),
  image: jsonb('image').$type<Pic>(),
  categoryId: varchar('category_id')
    .references(() => categories.id, {
      onDelete: 'cascade',
    })
    .notNull(),
});

export const articles = pgTable('articles', {
  ...defaultTenantColumns,
  title: varchar('title', { length: 30 }).notNull(),
  summary: varchar('description', { length: 60 }).notNull(),
  content: varchar('content', { length: 160 }).notNull(),
  images: jsonb('images').$type<Pic[]>(),
  video: jsonb('video').$type<Vid>(),
  active: boolean('active').default(true),
  categoryId: varchar('category_id').references(() => categories.id, {
    onDelete: 'set null',
  }),
  subCategoryId: varchar('sub_category_id').references(() => subCategories.id, {
    onDelete: 'set null',
  }),
  breakingNews: boolean('is_breaking').default(false),
  seo: jsonb('seo').$type<SeoInfo>(),
  published: boolean('published').default(false),
  sourceId: varchar('source_id'),
  location: jsonb('location').$type<Location>(),
});

export const tags = pgTable('tags', {
  ...defaultTenantColumns,
  name: varchar('name').notNull(),
  active: boolean('active').default(true),
});

export const articlesTags = pgTable('articles_tags', {
  articleId: varchar('article_id')
    .notNull()
    .references(() => articles.id),
  tagId: varchar('tag_id')
    .notNull()
    .references(() => tags.id),
});
