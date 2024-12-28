"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/drizzle";
import { collection, product } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import userSession from "../db/userSession";

export async function getCollections() {
  const { session } = await userSession();
  if (!session) {
    console.log("Session not found");
    return { collections: [] };
  }
  try {
    const collections = await db
      .select()
      .from(collection)
      .where(eq(collection.userId, session.user.id));
    return { collections };
  } catch (error) {
    console.error("Error fetching collections:", error);
    return { collections: [] };
  }
}

export async function getSingleCollection(collectionId: number) {
  const { session } = await userSession();
  if (!session) {
    return console.log("session not found");
  }
  const singleCollection = await db
    .select()
    .from(collection)
    .where(
      and(
        eq(collection.userId, session?.user.id),
        eq(collection.id, collectionId)
      )
    );
  return { singleCollection: singleCollection[0] };
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
export async function editCollection(
  collectionId: number,
  collectionName: string
) {
  const { session } = await userSession();
  if (!session) {
    return console.log("session not found");
  }

  await db
    .update(collection)
    .set({ title: collectionName })
    .where(eq(collection.id, collectionId));

  revalidatePath("/");
  return { success: "Collection has been updated" };
}

export async function deleteCollection(collectionId: any) {
  const { session } = await userSession();
  if (!session) {
    return console.log("session not found");
  }

  try {
    await db.transaction(async (trx) => {
      await trx
        .update(product)
        .set({ collectionId: null })
        .where(eq(product.collectionId, collectionId));

      await trx
        .delete(collection)
        .where(
          and(
            eq(collection.id, collectionId),
            eq(collection.userId, session.user.id)
          )
        );
    });

    revalidatePath("/");
    return {
      success: "Collection has been deleted and associated products updated",
    };
  } catch (error) {
    console.error("Error while deleting collection:", error);
    return { error: "Error while deleting collection" };
  }
}
