import {
  pgTable,
  text,
  integer,
  timestamp,
  boolean,
  varchar,
  primaryKey,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const collection = pgTable("collection", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  title: text("title").notNull(),
  description: text("description"),
});

export const tag = pgTable("tag", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
});

export const product = pgTable("product", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  collectionId: integer("collectionId").references(() => collection.id),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  inTrash: boolean("inTrash").default(false),
  title: varchar({ length: 600 }).notNull(),
  description: varchar({ length: 1500 }).notNull(),
  productUrl: varchar({ length: 2048 }).notNull(),
  imagePath: varchar({ length: 2048 }).notNull(),
});

// Product-Tag relationship (Join Table)
export const productTag = pgTable("product_tag", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  productId: integer("productId")
    .notNull()
    .references(() => product.id, { onDelete: "cascade" }),
  tagId: integer("tagId")
    .notNull()
    .references(() => tag.id, { onDelete: "cascade" }),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
});

// Better-auth schemas
export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  expiresAt: timestamp("expiresAt"),
  password: text("password"),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
});

export type Tag = typeof tag.$inferSelect;
export type Product = typeof product.$inferSelect;
export type ProductTag = typeof productTag.$inferSelect;
export type Collection = typeof collection.$inferSelect;
