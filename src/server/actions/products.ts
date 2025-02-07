"use server";

import { db } from "@/drizzle";
import { Product, product } from "@/drizzle/schema";
import { eq, and, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { ScrapeMetaData } from "@/utils/scrapeMetaData";
import { auth } from "@clerk/nextjs/server";

export async function getProducts() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();
  console.log(userId);
  try {
    const products = await db
      .select()
      .from(product)
      .where(and(eq(product.clerkUserId, userId), eq(product.inTrash, false)));
    return { products };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [] }; // Return an empty array in case of error
  }
}

export async function getProductsFromCollection(collectionId: number) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();
  try {
    const products = await db
      .select()
      .from(product)
      .where(
        and(
          eq(product.clerkUserId, userId),
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
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();
  try {
    const products = await db
      .select()
      .from(product)
      .where(and(eq(product.clerkUserId, userId), eq(product.inTrash, true)));
    return { products };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [] };
  }
}

export async function getProductUnsorted() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();
  try {
    const products = await db
      .select()
      .from(product)
      .where(
        and(
          eq(product.clerkUserId, userId),
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
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();
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
  clerkUserId: string,
  imageUrl: string,
  collectionId: number | undefined
) {
  const { userId } = await auth();
  if (!userId) {
    return;
  }
  const metaData = await ScrapeMetaData(imageUrl);
  try {
    const newImage: typeof product.$inferInsert = {
      title: metaData.title,
      description: metaData.description,
      productUrl: metaData.url,
      imagePath: metaData.images[0],
      clerkUserId: clerkUserId,
      ...(collectionId && { collectionId }),
    };

    await db.insert(product).values(newImage);
    revalidatePath("/");
    return { success: "Product has been added" };
  } catch (error) {
    return { error: "Error while adding product" };
  }
}

export async function updateProduct(
  productId: number,
  newProductData: Product
) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();
  if (newProductData.collectionId === 0) {
    await db
      .update(product)
      .set({
        collectionId: null,
        inTrash: false,
        title: newProductData.title,
        description: newProductData.description,
        imagePath: newProductData.imagePath,
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
        imagePath: newProductData.imagePath,
      })
      .where(eq(product.id, productId));
  }

  revalidatePath("/");
  return { success: "Product has been updated" };
}
