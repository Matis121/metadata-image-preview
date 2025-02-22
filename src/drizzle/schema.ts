import {
  pgTable,
  text,
  integer,
  timestamp,
  boolean,
  varchar,
  unique,
} from "drizzle-orm/pg-core";

const createdAt = timestamp("createdAt").notNull().defaultNow();
const updatedAt = timestamp("updatedAt")
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const collection = pgTable(
  "collection",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    clerkUserId: text("clerkUserId").notNull(),
    title: text("title").notNull(),
    description: text("description"),
    emoji: text("emoji").default(""),
    createdAt,
    updatedAt,
  },
  (collection) => ({
    uniqueCollectionPerUser: unique("uniqueCollectionPerUser").on(
      collection.clerkUserId,
      collection.title
    ),
  })
);

export const tag = pgTable(
  "tag",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text("name").notNull(),
    clerkUserId: text("clerkUserId").notNull(),
    createdAt,
    updatedAt,
  },
  (tag) => ({
    uniqueTagPerUser: unique("uniqueTagPerUser").on(tag.clerkUserId, tag.name),
  })
);

export const product = pgTable("product", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  collectionId: integer("collectionId").references(() => collection.id),
  clerkUserId: text("clerkUserId").notNull(),
  inTrash: boolean("inTrash").default(false),
  title: varchar({ length: 600 }).notNull(),
  description: varchar({ length: 1500 }).notNull(),
  productUrl: varchar({ length: 2048 }).notNull(),
  imagePath: varchar({ length: 2048 }).notNull(),
  createdAt,
  updatedAt,
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
  clerkUserId: text("clerkUserId").notNull(),
});

export type Tag = typeof tag.$inferSelect;
export type Product = typeof product.$inferSelect;
export type ProductTag = typeof productTag.$inferSelect;
export type Collection = typeof collection.$inferSelect;
