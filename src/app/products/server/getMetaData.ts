"use server";

import { getLinkPreview } from "link-preview-js";

export async function GetMetaData(imageUrl: string) {
  try {
    const metaData = await getLinkPreview(imageUrl);
    return metaData;
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return null;
  }
}
