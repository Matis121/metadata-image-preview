import Image from "next/image";
import emptyState from "@/assets/empty-state.svg";
import { ProductForm } from "./productForm";
import { auth } from "@clerk/nextjs/server";

export default async function EmptyState({
  productsLength,
  isTrashPath = false,
}: {
  productsLength: number;
  isTrashPath?: boolean;
}) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  return (
    <div className="flex items-center justify-center text-neutral-400">
      {productsLength === 0 ? (
        <div className="flex flex-col items-center justify-center gap-6">
          <Image
            alt="Product Image"
            width={300}
            height={300}
            src={emptyState}
          />
          <p>There is no products</p>
          <div className="flex justify-center items-center">
            {!isTrashPath && <ProductForm clerkUserId={userId} />}
          </div>
        </div>
      ) : (
        <p className="text-sm">
          {productsLength === 1 ? "1 bookmark" : `${productsLength} bookmarks`}
        </p>
      )}
    </div>
  );
}
