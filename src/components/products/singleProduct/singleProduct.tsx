import { getTagsInProduct } from "@/server/actions/tags";
import ProductInformations from "./productInformations";
import ProductInteractions from "./productInteractions";
import { Collection, Product, Tag } from "@/drizzle/schema";

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
  const { productTags } = await getTagsInProduct(singleProduct.id);
  console.log(productTags);

  return (
    <div className="relative">
      <ProductInformations
        singleProduct={singleProduct}
        showCollection={showCollection}
        tags={tags}
        productTags={productTags}
      />
      <ProductInteractions
        singleProduct={singleProduct}
        collections={collections}
        tags={tags}
        productTags={productTags}
      />
    </div>
  );
}
