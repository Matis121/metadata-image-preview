"use server";

import { db } from "@/drizzle";
import { eq } from "drizzle-orm";
import { product } from "@/drizzle/schema";
import { revalidatePath } from "next/cache";

export async function DeleteProduct(productId: number) {
  try {
    await db.delete(product).where(eq(product.id, productId));
    revalidatePath("/");
    return { success: "Product has been deleted" };
  } catch (error) {
    return { error: "Error while deleting product" };
  }
}
