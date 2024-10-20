CREATE TABLE IF NOT EXISTS "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"category" text,
	"depends_on" integer,
	"status" integer,
	"description" text,
	"designer_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "waitlist" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "image_model" text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "rooms" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "rooms" ADD COLUMN "image_for_generation" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "remaining" integer DEFAULT 100 NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "isPro" boolean DEFAULT false;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "todos" ADD CONSTRAINT "todos_depends_on_todos_id_fk" FOREIGN KEY ("depends_on") REFERENCES "public"."todos"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "todos" ADD CONSTRAINT "todos_designer_id_user_id_fk" FOREIGN KEY ("designer_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
