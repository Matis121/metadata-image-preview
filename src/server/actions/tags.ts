"use server";

import { product, productTag, tag } from "@/drizzle/schema";
import userSession from "../db/userSession";
import { revalidatePath } from "next/cache";
import { db } from "@/drizzle";
import { eq, and, or } from "drizzle-orm";

export async function addTag(name: string) {
  const { session } = await userSession();
  if (!session) {
    return console.log("session not found");
  }
  try {
    const newTag: typeof tag.$inferInsert = {
      name: name,
      userId: session?.user.id,
    };

    await db.insert(tag).values(newTag);
    revalidatePath("/");
    return { success: "Tag has been added" };
  } catch (error) {
    return { error: "Error while adding new tag" };
  }
}

export async function addTagsToProduct(productId, tagIds) {
  const { session } = await userSession();
  if (!session) {
    console.log("Session not found");
    return { productTags: [] };
  }
  try {
    const existingTags = await db
      .select()
      .from(productTag)
      .where(
        and(
          eq(productTag.userId, session.user.id),
          eq(productTag.productId, productId)
        )
      );

    // Step 2: Extract the tagIds that already exist
    const existingTagIds = existingTags.map((tag) => tag.tagId);

    // Step 3: Filter out tags that are already associated with the product
    const tagsToAdd = tagIds.filter((tagId) => !existingTagIds.includes(tagId));

    // Step 4: If there are tags to add, insert them
    if (tagsToAdd.length > 0) {
      const insertData = tagsToAdd.map((tagId) => ({
        productId: productId,
        tagId,
        userId: session?.user.id,
      }));

      await db.insert(productTag).values(insertData);
      return { success: "Tag has been added to product" };
    }
  } catch (error) {
    return { error: "Error while adding new tag" };
  }

  // Step 1: Check which tagId-productId pairs already exist
}

export async function getTags() {
  const { session } = await userSession();
  if (!session) {
    console.log("Session not found");
    return { tags: [] };
  }
  try {
    const tags = await db
      .select()
      .from(tag)
      .where(eq(tag.userId, session.user.id));
    return { tags };
  } catch (error) {
    console.error("Error fetching collections:", error);
    return { tags: [] };
  }
}

export async function getTagsInProduct(productId) {
  const { session } = await userSession();
  if (!session) {
    console.log("Session not found");
    return { productTags: [] };
  }
  try {
    const productTags = await db
      .select()
      .from(productTag)
      .where(
        and(
          eq(productTag.userId, session.user.id),
          eq(productTag.productId, productId)
        )
      );
    return { productTags };
  } catch (error) {
    console.error("Error fetching collections:", error);
    return { productTags: [] };
  }
}

export async function getProductsByTag(tagId: number) {
  const { session } = await userSession();
  if (!session) {
    console.log("Session not found");
    return { products: [] };
  }

  try {
    // Step 1: Get the product IDs associated with the tag
    const productIds = await db
      .select({ productId: productTag.productId })
      .from(productTag)
      .where(
        and(eq(productTag.userId, session.user.id), eq(productTag.tagId, tagId))
      );

    if (productIds.length === 0) {
      return { products: [] };
    }

    // Step 2: Construct `or` conditions for the products
    const productConditions = productIds.map((p) =>
      eq(product.id, p.productId)
    );
    const whereCondition = or(...productConditions);

    // Step 3: Query the `product` table
    const productList = await db
      .select()
      .from(product)
      .where(and(eq(product.userId, session.user.id), whereCondition));

    return { products: productList };
  } catch (error) {
    console.error("Error fetching products by tag:", error);
    return { products: [] };
  }
}

export async function getSingleTag(tagId: number) {
  const { session } = await userSession();
  if (!session) {
    return console.log("session not found");
  }
  const singleCollection = await db
    .select()
    .from(tag)
    .where(and(eq(tag.userId, session?.user.id), eq(tag.id, tagId)));
  return { singleCollection: singleCollection[0] };
}

export async function deleteTag(tagId: number) {
  const { session } = await userSession();
  if (!session) {
    return console.log("session not found");
  }
  try {
    await db
      .delete(tag)
      .where(and(eq(tag.id, tagId), eq(tag.userId, session.user.id)));
    revalidatePath("/");
    return { success: "Tag has been deleted" };
  } catch (error) {
    return { error: "Error while deleting tag" };
  }
}

export async function editTag(tagId: number, tagName: string) {
  const { session } = await userSession();
  if (!session) {
    return console.log("session not found");
  }
  try {
    await db
      .update(tag)
      .set({ name: tagName })
      .where(and(eq(tag.id, tagId), eq(tag.userId, session.user.id)));

    revalidatePath("/");
    return { success: "Tag has been updated" };
  } catch (error) {
    return { error: "Tag cannot be updated" };
  }
}
