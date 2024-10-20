CREATE TABLE IF NOT EXISTS "users2" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "users2_email_unique" UNIQUE("email")
);
