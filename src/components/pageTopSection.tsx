import { UserButton } from "@clerk/nextjs";
import { ProductForm } from "./products/productForm";

export default function PageTopSection({
  clerkUserId,
  isProductFormActive = true,
  collectionId,
}: {
  clerkUserId: string;
  isProductFormActive?: boolean;
  collectionId?: number;
}) {
  return (
    <div className="w-full flex justify-between px-4 py-3 sticky top-0 bg-neutral-800 z-50 border-b border-neutral-600">
      {isProductFormActive && <ProductForm clerkUserId={clerkUserId} />}
      <div className="ml-auto h-[35px] w-[35px]">
        <UserButton />
      </div>
    </div>
  );
}
