"use server";

import { db } from "@/drizzle";
import { product } from "@/drizzle/schema";
import userSession from "../db/userSession";
import { eq, and } from "drizzle-orm";

export async function getProducts() {
  const { session } = await userSession();
  if (!session) {
    return console.log("session not found");
  }
  const products = await db
    .select()
    .from(product)
    .where(eq(product.userId, session.user.id));
  return { products };
}

export async function getProductsFromCollection(collectionId: any) {
  console.log(collectionId);
  const { session } = await userSession();
  if (!session) {
    return console.log("session not found");
  }
  const products = await db
    .select()
    .from(product)
    .where(
      and(
        eq(product.userId, session.user.id),
        eq(product.collectionId, collectionId)
      )
    );
  return { products };
}

export async function getProductsInTrash() {
  const { session } = await userSession();
  if (!session) {
    return console.log("session not found");
  }

  const products = await db
    .select()
    .from(product)
    .where(and(eq(product.userId, session.user.id), eq(product.inTrash, true)));

  return { products };
}

export async function getProductUnsorted() {
  const { session } = await userSession();
  if (!session) {
    return console.log("session not found");
  }

  const products = await db
    .select()
    .from(product)
    .where(
      and(
        eq(product.userId, session.user.id),
        eq(product.collectionId, null),
        eq(product.inTrash, false)
      )
    );

  return { products };
}
