"use server";

import { db } from "@/drizzle";
import { product } from "@/drizzle/schema";
import userSession from "../db/userSession";
import { eq, and, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { ScrapeMetaData } from "@/utils/scrapeMetaData";

export async function getProducts() {
  const { session } = await userSession();
  if (!session) {
    console.log("session not found");
    return { products: [] };
  }
  try {
    const products = await db
      .select()
      .from(product)
      .where(
        and(eq(product.userId, session.user.id), eq(product.inTrash, false))
      );
    return { products };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [] }; // Return an empty array in case of error
  }
}

export async function getProductsFromCollection(collectionId: any) {
  const { session } = await userSession();
  if (!session) {
    console.log("session not found");
    return { products: [] };
  }
  try {
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
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [] };
  }
}

export async function getProductsInTrash() {
  const { session } = await userSession();
  if (!session) {
    console.log("session not found");
    return { products: [] };
  }
  try {
    const products = await db
      .select()
      .from(product)
      .where(
        and(eq(product.userId, session.user.id), eq(product.inTrash, true))
      );
    return { products };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [] };
  }
}

export async function getProductUnsorted() {
  const { session } = await userSession();
  if (!session) {
    console.log("session not found");
    return { products: [] };
  }
  try {
    const products = await db
      .select()
      .from(product)
      .where(
        and(
          eq(product.userId, session.user.id),
          isNull(product.collectionId),
          eq(product.inTrash, false)
        )
      );
    return { products };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [] };
  }
}

export async function deleteProduct(productId: number) {
  const { session } = await userSession();
  if (!session) {
    return console.log("session not found");
  }
  try {
    const existingProducts = await db
      .select()
      .from(product)
      .where(eq(product.id, productId));

    const existingProduct = existingProducts[0];
    if (!existingProduct) {
      return { error: "Product not found" };
    }
    if (existingProduct.inTrash) {
      await db.delete(product).where(eq(product.id, productId));
      revalidatePath("/");
      return { success: "Product has been permanently deleted" };
    } else {
      await db
        .update(product)
        .set({ inTrash: true, collectionId: null })
        .where(eq(product.id, productId));
      revalidatePath("/");
      return { success: "Product has been moved to trash" };
    }
  } catch (error) {
    return { error: "Error while deleting product" };
  }
}

export async function addProduct(
  imageUrl: string,
  collectionId: number | undefined
) {
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
      ...(collectionId && { collectionId }),
    };

    await db.insert(product).values(newImage);
    revalidatePath("/");
    return { success: "Product has been added" };
  } catch (error) {
    return { error: "Error while adding product" };
  }
}

export async function updateProduct(productId: number, newProductData: any) {
  const { session } = await userSession();
  if (!session) {
    return console.log("session not found");
  }
  if (newProductData.collectionId === "unsorted") {
    await db
      .update(product)
      .set({
        collectionId: null,
        inTrash: false,
        title: newProductData.title,
        description: newProductData.description,
        imagePath: newProductData.image,
      })
      .where(eq(product.id, productId));
  } else {
    await db
      .update(product)
      .set({
        collectionId: newProductData.collectionId,
        inTrash: false,
        title: newProductData.title,
        description: newProductData.description,
        imagePath: newProductData.image,
      })
      .where(eq(product.id, productId));
  }

  revalidatePath("/");
  return { success: "Product has been updated" };
}
