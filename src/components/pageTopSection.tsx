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
    <div className="w-full flex justify-between px-4">
      {isProductFormActive && <ProductForm clerkUserId={clerkUserId} />}
      <div className="ml-auto">
        <UserButton />
      </div>
    </div>
  );
}
