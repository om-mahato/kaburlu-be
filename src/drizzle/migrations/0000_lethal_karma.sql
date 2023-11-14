CREATE TABLE IF NOT EXISTS "articles" (
	"id" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"tenant_id" varchar NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar(60) NOT NULL,
	"content" varchar(160) NOT NULL,
	"images" jsonb,
	"video" jsonb,
	"active" boolean DEFAULT true,
	"category_id" varchar,
	"sub_category_id" varchar,
	"is_breaking" boolean DEFAULT false,
	"seo" jsonb,
	"published" boolean DEFAULT false,
	"source_id" varchar,
	"location" jsonb,
	CONSTRAINT articles_id PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "articles_tags" (
	"article_id" varchar NOT NULL,
	"tag_id" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories" (
	"id" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"tenant_id" varchar NOT NULL,
	"name" varchar NOT NULL,
	"active" boolean DEFAULT true,
	"image" jsonb,
	CONSTRAINT categories_id PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sub_categories" (
	"id" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"tenant_id" varchar NOT NULL,
	"name" varchar NOT NULL,
	"active" boolean DEFAULT true,
	"image" jsonb,
	"category_id" varchar NOT NULL,
	CONSTRAINT sub_categories_id PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"id" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"tenant_id" varchar NOT NULL,
	"name" varchar NOT NULL,
	"active" boolean DEFAULT true,
	CONSTRAINT tags_id PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tenants" (
	"id" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"domain" varchar NOT NULL,
	"language" varchar NOT NULL,
	"rni_number" varchar,
	"publisher_name" varchar,
	"publisher_contact_number" varchar,
	"chief_editor_name" varchar,
	"contact_number" varchar,
	"circulation_state" varchar,
	"address" jsonb NOT NULL,
	CONSTRAINT tenants_id PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"tenant_id" varchar,
	"name" varchar(50),
	"email" varchar(50) NOT NULL,
	"password" varchar(255),
	"phone_number" varchar(10),
	"is_verified" boolean DEFAULT false,
	"role" text DEFAULT 'user',
	"extra" jsonb,
	"auto_publish" boolean DEFAULT false,
	"address" jsonb,
	"id_image" jsonb,
	CONSTRAINT users_id PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "articles_tenant_id_title_index" ON "articles" ("tenant_id","title");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "categories_tenant_id_name_index" ON "categories" ("tenant_id","name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "sub_categories_tenant_id_name_index" ON "sub_categories" ("tenant_id","name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "tags_tenant_id_name_index" ON "tags" ("tenant_id","name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users_tenant_id_email_index" ON "users" ("tenant_id","email");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "articles" ADD CONSTRAINT "articles_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "articles" ADD CONSTRAINT "articles_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "articles" ADD CONSTRAINT "articles_sub_category_id_sub_categories_id_fk" FOREIGN KEY ("sub_category_id") REFERENCES "sub_categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "articles_tags" ADD CONSTRAINT "articles_tags_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "articles_tags" ADD CONSTRAINT "articles_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "categories" ADD CONSTRAINT "categories_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sub_categories" ADD CONSTRAINT "sub_categories_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sub_categories" ADD CONSTRAINT "sub_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tags" ADD CONSTRAINT "tags_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
