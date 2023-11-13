CREATE TABLE IF NOT EXISTS "tenants" (
	"id" varchar NOT NULL,
	"name" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT tenants_id PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar NOT NULL,
	"name" varchar(50),
	"email" varchar(50),
	"password" varchar(255),
	"phone_number" varchar(10),
	"is_verified" boolean DEFAULT false,
	"picture" varchar(255),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT users_id PRIMARY KEY("id")
);
