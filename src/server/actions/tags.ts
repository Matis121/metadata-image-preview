"use server";

import { product, productTag, tag } from "@/drizzle/schema";
import { revalidatePath } from "next/cache";
import { db } from "@/drizzle";
import { eq, and, or, count } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function getTags() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  try {
    const tags = await db.select().from(tag).where(eq(tag.clerkUserId, userId));
    return { tags };
  } catch (error) {
    console.error("Error fetching collections:", error);
    return { tags: [] };
  }
}

export async function getTagsWithCount() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  try {
    const tags = await db
      .select({
        id: tag.id,
        name: tag.name,
        productCount: count(productTag.id).as("product_count"),
      })
      .from(tag)
      .leftJoin(productTag, eq(productTag.tagId, tag.id))
      .where(eq(tag.clerkUserId, userId))
      .groupBy(tag.id);
    return { tags };
  } catch (error) {
    console.error("Error fetching collections:", error);
    return { tags: [] };
  }
}

export async function getSingleTag(tagId: number) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const singleTag = await db
    .select()
    .from(tag)
    .where(and(eq(tag.clerkUserId, userId), eq(tag.id, tagId)));
  return singleTag[0];
}

export async function getProductsByTag(tagId: number) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  try {
    const productIds = await db
      .select({ productId: productTag.productId })
      .from(productTag)
      .where(
        and(eq(productTag.clerkUserId, userId), eq(productTag.tagId, tagId))
      );

    if (productIds.length === 0) {
      return { products: [] };
    }

    const productConditions = productIds.map((p) =>
      eq(product.id, p.productId)
    );
    const whereCondition = or(...productConditions);

    const productList = await db
      .select()
      .from(product)
      .where(and(eq(product.clerkUserId, userId), whereCondition));

    return { products: productList };
  } catch (error) {
    console.error("Error fetching products by tag:", error);
    return { products: [] };
  }
}

export async function getTagsInProduct(productId: number) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  try {
    const productTags = await db
      .select({
        id: productTag.id,
        productId: productTag.productId,
        tagId: productTag.tagId,
        tagName: tag.name, // Get the tag name from the `tag` table
      })
      .from(productTag)
      .innerJoin(tag, eq(productTag.tagId, tag.id)) // Join `productTag` with `tag`
      .where(
        and(
          eq(productTag.clerkUserId, userId),
          eq(productTag.productId, productId)
        )
      );

    return { productTags };
  } catch (error) {
    console.error("Error fetching product tags:", error);
    return { productTags: [] };
  }
}

export async function createTag(name: string) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  try {
    const existingTagName = await db
      .select()
      .from(tag)
      .where(and(eq(tag.clerkUserId, userId), eq(tag.name, name)))
      .limit(1);

    if (existingTagName.length > 0) {
      return { error: "Tag already exists" };
    }

    await db.insert(tag).values({ name, clerkUserId: userId });
    revalidatePath("/");
    return { success: "Tag has been added" };
  } catch (error) {
    return { error: "Error while adding new tag" };
  }
}

export async function createTagAndAddToProduct(
  clerkUserId: string,
  name: string,
  productId: number
) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  try {
    const newTag: typeof tag.$inferInsert = {
      name: name,
      clerkUserId: clerkUserId,
    };

    const insertedTag = await db
      .insert(tag)
      .values(newTag)
      .returning({ id: tag.id });

    if (!insertedTag || insertedTag.length === 0) {
      return { error: "Error retrieving inserted tag" };
    }

    const tagId = insertedTag[0].id;

    await db.insert(productTag).values({
      productId: productId,
      tagId: tagId,
      clerkUserId: clerkUserId,
    });

    revalidatePath("/");
    return { success: "Tag has been added and linked to the product" };
  } catch (error) {
    console.error(error);
    return { error: "Error while adding new tag and linking to product" };
  }
}

export async function addTagsToProduct(
  clerkUserId: string,
  productId: number,
  tagIds: number[]
) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  try {
    const existingTags = await db
      .select()
      .from(productTag)
      .where(
        and(
          eq(productTag.clerkUserId, userId),
          eq(productTag.productId, productId)
        )
      );

    const existingTagIds = existingTags.map((tag) => tag.tagId);

    const tagsToAdd = tagIds.filter(
      (tagId: number) => !existingTagIds.includes(tagId)
    );

    if (tagsToAdd.length > 0) {
      const insertData = tagsToAdd.map((tagId: number) => ({
        productId: productId,
        tagId,
        clerkUserId: clerkUserId,
      }));

      await db.insert(productTag).values(insertData);
      revalidatePath("/");
      return { success: "Tag has been added to product" };
    }
  } catch (error) {
    return { error: "Error while adding new tag" };
  }
}

export async function removeTagFromProduct(productId: number, tagId: number) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  try {
    await db
      .delete(productTag)
      .where(
        and(
          eq(productTag.productId, productId),
          eq(productTag.tagId, tagId),
          eq(productTag.clerkUserId, userId)
        )
      );

    revalidatePath("");
    return { success: "Tag has been removed from product" };
  } catch (error) {
    return { error: "Error while removing tag from product" };
  }
}

export async function deleteTag(tagId: number) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();
  try {
    await db
      .delete(tag)
      .where(and(eq(tag.id, tagId), eq(tag.clerkUserId, userId)));
    revalidatePath("/");
    return { success: "Tag has been deleted" };
  } catch (error) {
    return { error: "Error while deleting tag" };
  }
}

export async function editTag(tagId: number, tagName: string) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();
  try {
    await db
      .update(tag)
      .set({ name: tagName })
      .where(and(eq(tag.id, tagId), eq(tag.clerkUserId, userId)));

    revalidatePath("/");
    return { success: "Tag has been updated" };
  } catch (error) {
    return { error: "Tag cannot be updated" };
  }
}
