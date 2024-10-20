"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/app/db";
import { images } from "@/app/db/schema";

export async function AddNewProduct(imageUrl: string) {
  try {
    const newUser: typeof images.$inferInsert = {
      url: imageUrl,
    };

    await db.insert(images).values(newUser);
    revalidatePath("/");
  } catch (error) {
    console.error("Error adding product:", error);
  }
}
