"use server";

import { db } from "@/drizzle";
import { product } from "@/drizzle/schema";
import userSession from "../db/userSession";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { ScrapeMetaData } from "@/utils/scrapeMetaData";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getProducts() {
  const { session } = await userSession();
  if (!session) {
    return console.log("session not found");
  }
  const products = await db
    .select()
    .from(product)
    .where(eq(product.userId, session.user.id));
  return { products };
}

export async function getProductsFromCollection(collectionId: any) {
  const { session } = await userSession();
  if (!session) {
    return console.log("session not found");
  }
  const products = await db
    .select()
    .from(product)
    .where(
      and(
        eq(product.userId, session.user.id),
        eq(product.collectionId, collectionId)
      )
    );
  return { products };
}

export async function getProductsInTrash() {
  const { session } = await userSession();
  if (!session) {
    return console.log("session not found");
  }

  const products = await db
    .select()
    .from(product)
    .where(and(eq(product.userId, session.user.id), eq(product.inTrash, true)));

  return { products };
}

export async function getProductUnsorted() {
  const { session } = await userSession();
  if (!session) {
    return console.log("session not found");
  }

  const products = await db
    .select()
    .from(product)
    .where(
      and(
        eq(product.userId, session.user.id),
        eq(product.collectionId, null),
        eq(product.inTrash, false)
      )
    );

  return { products };
}

export async function deleteProduct(productId: number) {
  const { session } = await userSession();
  if (!session) {
    return console.log("session not found");
  }
  try {
    await db.delete(product).where(eq(product.id, productId));
    revalidatePath("/");
    return { success: "Product has been deleted" };
  } catch (error) {
    return { error: "Error while deleting product" };
  }
}

export async function addProduct(imageUrl: string) {
  const { session } = await userSession();
  if (!session) {
    return console.log("session not found");
  }
  const metaData = await ScrapeMetaData(imageUrl);
  try {
    const newImage: typeof product.$inferInsert = {
      title: metaData.title,
      description: metaData.description,
      productUrl: metaData.url,
      imagePath: metaData.images[0],
      userId: session?.user.id,
    };

    await db.insert(product).values(newImage);
    revalidatePath("/");
    return { success: "Product has been added" };
  } catch (error) {
    return { error: "Error while adding product" };
  }
}

export async function updateProduct(productId: string, collectionId: string) {
  const { session } = await userSession();
  if (!session) {
    return console.log("session not found");
  }

  await db
    .update(product)
    .set({ collectionId: collectionId })
    .where(eq(product.id, productId));

  revalidatePath("/");
  return { success: "Product has been updated" };
}
