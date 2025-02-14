import { getTagsInProduct } from "@/server/actions/tags";
import ProductInformations from "./productInformations";
import ProductInteractions from "./productInteractions";
import { Collection, Product, Tag } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";

export default async function SingleProduct({
  singleProduct,
  collections,
  tags,
  showCollection,
}: {
  singleProduct: Product;
  collections: Collection[];
  tags: Tag[];
  showCollection?: boolean;
}) {
  const { userId } = await auth();
  if (!userId) {
    return;
  }

  const { productTags } = await getTagsInProduct(singleProduct.id);

  return (
    <div className="relative">
      <ProductInformations
        singleProduct={singleProduct}
        showCollection={showCollection}
        productTags={productTags}
      />
      <ProductInteractions
        clerkUserId={userId}
        singleProduct={singleProduct}
        collections={collections}
        tags={tags}
        productTags={productTags}
      />
    </div>
  );
}
