"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/drizzle";
import { collection } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import userSession from "../db/userSession";

export async function getCollections() {
  const { session } = await userSession();
  if (!session) {
    return console.log("session not found");
  }
  const collections = await db
    .select()
    .from(collection)
    .where(eq(collection.userId, session?.user.id));
  return { collections };
}

export async function addCollection() {
  const { session } = await userSession();
  if (!session) {
    return console.log("session not found");
  }
  const newCollection: typeof collection.$inferInsert = {
    userId: session.user.id,
    title: "Collection example",
  };
  await db.insert(collection).values(newCollection);
  revalidatePath("/");
  return { success: "Product has been added" };
}
