import { getCollections } from "@/server/actions/collections";
import SingleProduct from "../card/singleProduct/singleProduct";
import { getTags } from "@/server/actions/tags";
import { Product } from "@/drizzle/schema";
import EmptyState from "../../emptyState";

export default async function ProductCard({
  products,
  showCollection,
}: {
  products: Array<Product>;
  showCollection?: boolean;
}) {
  const { collections } = await getCollections();
  const { tags } = await getTags();

  return (
    <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
      {products?.map((product: Product) => (
        <SingleProduct
          key={product.id}
          collections={collections}
          tags={tags}
          singleProduct={product}
          showCollection={showCollection}
        />
      ))}
    </div>
  );
}
