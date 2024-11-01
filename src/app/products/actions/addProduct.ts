"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/drizzle";
import { images } from "@/drizzle/schema";
import { ScrapeMetaData } from "@/utils/scrapeMetaData";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function AddProduct(imageUrl: string) {
  const metaData = await ScrapeMetaData(imageUrl);
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  try {
    const newImage: typeof images.$inferInsert = {
      title: metaData.title,
      description: metaData.description,
      productUrl: metaData.url,
      imagePath: metaData.images[0],
      userId: session?.user.id,
    };

    await db.insert(images).values(newImage);
    revalidatePath("/");
    return { success: "Product has been added" };
  } catch (error) {
    return { error: "Error while adding product" };
  }
}
