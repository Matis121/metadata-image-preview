import { getTagsInProduct } from "@/server/actions/tags";
import ProductInformations from "./productInformations";
import ProductInteractions from "./productInteractions";

export default async function SingleProduct({
  singleProduct,
  collections,
  tags,
  showCollection,
}: {
  singleProduct: any;
  collections: any;
  tags: any;
  showCollection?: boolean;
}) {
  const { productTags } = await getTagsInProduct(singleProduct.id);

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
