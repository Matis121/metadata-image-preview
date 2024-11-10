"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/drizzle";
import { collection } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
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

export async function addCollection(collectionName: string) {
  const { session } = await userSession();
  if (!session) {
    return console.log("session not found");
  }
  const newCollection: typeof collection.$inferInsert = {
    userId: session.user.id,
    title: collectionName,
  };
  await db.insert(collection).values(newCollection);
  revalidatePath("/");
  return { success: "Product has been added" };
}

export async function deleteCollection(collectionId: any) {
  const { session } = await userSession();
  if (!session) {
    return console.log("session not found");
  }

  try {
    await db
      .delete(collection)
      .where(
        and(
          eq(collection.id, collectionId),
          eq(collection.userId, session.user.id)
        )
      );

    revalidatePath("/");
    return { success: "Collection has been deleted" };
  } catch (error) {
    console.error("Error while deleting collection:", error);
    return { error: "Error while deleting collection" };
  }
}
