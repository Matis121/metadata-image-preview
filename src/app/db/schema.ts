import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
export const images = pgTable("images", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  url: varchar({ length: 500 }).notNull(),
});
