"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/drizzle";
import { collection, product } from "@/drizzle/schema";
import { and, count, eq, sql } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function getCollections() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();
  try {
    const collections = await db
      .select()
      .from(collection)
      .where(eq(collection.clerkUserId, userId));
    return { collections };
  } catch (error) {
    console.error("Error fetching collections:", error);
    return { collections: [] };
  }
}

export async function getCollectionsWithCount() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  try {
    const collections = await db
      .select({
        id: collection.id,
        title: collection.title,
        description: collection.description,
        emoji: collection.emoji,
        productCount: count(product.id).as("product_count"),
      })
      .from(collection)
      .leftJoin(product, eq(product.collectionId, collection.id))
      .where(eq(collection.clerkUserId, userId))
      .groupBy(collection.id);

    return { collections };
  } catch (error) {
    console.error("Error fetching collections:", error);
    return { collections: [] };
  }
}

export async function getSingleCollection(collectionId: number) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();
  const singleCollection = await db
    .select()
    .from(collection)
    .where(
      and(eq(collection.clerkUserId, userId), eq(collection.id, collectionId))
    );
  return singleCollection[0];
}

export async function addCollection(
  clerkUserId: string,
  collectionName: string
) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const existingCollectioName = await db
    .select()
    .from(collection)
    .where(
      and(
        eq(collection.clerkUserId, userId),
        eq(collection.title, collectionName)
      )
    )
    .limit(1);

  if (existingCollectioName.length > 0) {
    return { error: "Collection name already exists" };
  }

  const newCollection: typeof collection.$inferInsert = {
    clerkUserId: clerkUserId,
    title: collectionName,
  };

  await db.insert(collection).values(newCollection);
  revalidatePath("/");
  return { success: "Collection has been added" };
}
export async function editCollection(
  collectionId: number,
  collectionName: string
) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  await db
    .update(collection)
    .set({ title: collectionName })
    .where(eq(collection.id, collectionId));

  revalidatePath("/");
  return { success: "Collection has been updated" };
}

export async function deleteCollection(collectionId: number) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

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
            eq(collection.clerkUserId, userId)
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

export async function setCollectionEmoji(
  collectionId: number,
  newEmoji: string
) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  try {
    await db
      .update(collection)
      .set({ emoji: newEmoji })
      .where(
        and(eq(collection.clerkUserId, userId), eq(collection.id, collectionId))
      );

    revalidatePath("/");
    return {
      success: "Collection emoji has been updated",
    };
  } catch (error) {
    return { error: "Error while updating collection emoji" };
  }
}
