ALTER TABLE "images" ADD COLUMN "title" varchar(600) NOT NULL;--> statement-breakpoint
ALTER TABLE "images" ADD COLUMN "description" varchar(1500) NOT NULL;--> statement-breakpoint
ALTER TABLE "images" ADD COLUMN "productUrl" varchar(2048) NOT NULL;--> statement-breakpoint
ALTER TABLE "images" ADD COLUMN "imagePath" varchar(2048) NOT NULL;--> statement-breakpoint
ALTER TABLE "images" DROP COLUMN IF EXISTS "url";