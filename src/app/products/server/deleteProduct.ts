"use server";

import { db } from "@/app/db";
import { eq } from "drizzle-orm";
import { images } from "@/app/db/schema";
import { revalidatePath } from "next/cache";

export async function DeleteProduct(productId: number) {
  try {
    await db.delete(images).where(eq(images.id, productId));
    revalidatePath("/");
    console.log(`Product with id ${productId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting product:", error);
  }
}
