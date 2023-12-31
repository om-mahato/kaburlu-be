import { relations } from 'drizzle-orm';
import {
  boolean,
  jsonb,
  pgTable,
  primaryKey,
  text,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';
import { defaultColumns, defaultTenantColumns } from './drizzle.utils';
import {
  Address,
  ArticleBlock,
  Domain,
  Pic,
  SeoInfo,
  UserInfo,
  Vid,
} from './schema-helpers';

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
  users: many(users),
}));

export const users = pgTable(
  'users',
  {
    ...defaultColumns,
    tenantId: varchar('tenant_id').references(() => tenants.id, {
      onDelete: 'cascade',
    }),
    name: varchar('name', { length: 50 }),
    email: varchar('email', { length: 50 }).notNull(),
    password: varchar('password', { length: 255 }),
    phoneNumber: varchar('phone_number', { length: 10 }),
    isVerified: boolean('is_verified').default(false),
    role: text('role', {
      enum: ['super_admin', 'admin', 'editor', 'reporter', 'user'],
    }).default('user'),
    info: jsonb('extra').$type<UserInfo>(), // kaburlu specific columns
    autoPublish: boolean('auto_publish').default(false),
    address: jsonb('address').$type<Address>(),
    idImage: jsonb('id_image').$type<Pic>(),
  },
  (users) => ({
    primary: primaryKey({
      columns: [users.id],
    }),
    email: uniqueIndex().on(users.tenantId, users.email),
  }),
);

export const usersRelations = relations(users, ({ one }) => ({
  tenant: one(tenants, {
    fields: [users.tenantId],
    references: [tenants.id],
  }),
}));

export const categories = pgTable(
  'categories',
  {
    ...defaultTenantColumns,
    name: varchar('name').notNull(),
    active: boolean('active').default(true),
    image: jsonb('image').$type<Pic>(),
  },
  (categories) => ({
    primary: primaryKey({
      columns: [categories.id],
    }),
    nameIdx: uniqueIndex().on(categories.tenantId, categories.name),
  }),
);

export const subCategories = pgTable(
  'sub_categories',
  {
    ...defaultTenantColumns,
    name: varchar('name').notNull(),
    active: boolean('active').default(true),
    image: jsonb('image').$type<Pic>(),
    categoryId: varchar('category_id')
      .references(() => categories.id, {
        onDelete: 'cascade',
      })
      .notNull(),
  },
  (subCategories) => ({
    primary: primaryKey({
      columns: [subCategories.id],
    }),
    nameIdx: uniqueIndex().on(subCategories.tenantId, subCategories.name),
  }),
);

export const articles = pgTable(
  'articles',
  {
    ...defaultTenantColumns,
    title: varchar('title', { length: 30 }).notNull(),
    slug: varchar('title').notNull(),
    blocks: jsonb('blocks').$type<ArticleBlock>(),
    summary: varchar('description', { length: 60 }).notNull(),
    content: varchar('content', { length: 160 }).notNull(),
    images: jsonb('images').$type<Pic[]>(),
    video: jsonb('video').$type<Vid>(),
    active: boolean('active').default(true),
    categoryId: varchar('category_id').references(() => categories.id),
    subCategoryId: varchar('sub_category_id').references(
      () => subCategories.id,
    ),
    breakingNews: boolean('is_breaking').default(false),
    seo: jsonb('seo').$type<SeoInfo>(),
    published: boolean('published').default(false),
    location: jsonb('location').$type<string>(),
  },
  (articles) => ({
    primary: primaryKey({
      columns: [articles.id],
    }),
    slugIdx: uniqueIndex().on(articles.tenantId, articles.slug),
  }),
);

export const tags = pgTable(
  'tags',
  {
    ...defaultTenantColumns,
    name: varchar('name').notNull(),
    active: boolean('active').default(true),
  },
  (tags) => ({
    primary: primaryKey({
      columns: [tags.id],
    }),
    nameIdx: uniqueIndex().on(tags.tenantId, tags.name),
  }),
);

export const articlesTags = pgTable('articles_tags', {
  articleId: varchar('article_id')
    .notNull()
    .references(() => articles.id),
  tagId: varchar('tag_id')
    .notNull()
    .references(() => tags.id),
});
