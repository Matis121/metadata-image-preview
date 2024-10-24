import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
export const images = pgTable("images", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 600 }).notNull(),
  description: varchar({ length: 1500 }).notNull(),
  productUrl: varchar({ length: 2048 }).notNull(),
  imagePath: varchar({ length: 2048 }).notNull(),
});
