"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/app/db";
import { images } from "@/app/db/schema";
import { getLinkPreview } from "link-preview-js";

type LinkPreviewMetadata = {
  title: string;
  description: string;
  url: string;
  images: string[];
};

export async function AddProduct(imageUrl: string) {
  const metaData: LinkPreviewMetadata = await getLinkPreview(imageUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      Referer: "https://google.com",
      Connection: "keep-alive",
      "Upgrade-Insecure-Requests": "1",
      "Cache-Control": "no-cache",
    },
  });
  try {
    const newImage: typeof images.$inferInsert = {
      title: metaData.title,
      description: metaData.description,
      productUrl: metaData.url,
      imagePath: metaData.images[0],
    };

    await db.insert(images).values(newImage);
    revalidatePath("/");
    return { success: "Product has been added" };
  } catch (error) {
    return { error: "Error while adding product" };
  }
}
