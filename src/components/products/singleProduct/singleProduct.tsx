import ProductInformations from "./productInformations";
import ProductInteractions from "./productInteractions";

export default function SingleProduct({
  singleProduct,
  collections,
  showCollection,
}: {
  singleProduct: any;
  collections: any;
  showCollection?: boolean;
}) {
  return (
    <div className="relative">
      <ProductInformations
        singleProduct={singleProduct}
        showCollection={showCollection}
      />
      <ProductInteractions singleProduct={singleProduct} collections={collections} />
    </div>
  );
}
