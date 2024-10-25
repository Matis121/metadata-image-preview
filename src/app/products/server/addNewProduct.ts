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

export async function AddNewProduct(imageUrl: string) {
  const metaData: LinkPreviewMetadata = await getLinkPreview(imageUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      Referer: "https://google.com",
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
  } catch (error) {
    console.error("Error adding product:", error);
  }
}
