"use server";

import { db } from "@/app/db";
import { eq } from "drizzle-orm";
import { images } from "@/app/db/schema";
import { revalidatePath } from "next/cache";

export async function DeleteProduct(productId: number) {
  try {
    await db.delete(images).where(eq(images.id, productId));
    revalidatePath("/");
    return { success: "Product has been deleted" };
  } catch (error) {
    return { error: "Error while deleting product" };
  }
}
