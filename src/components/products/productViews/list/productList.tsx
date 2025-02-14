import { getCollections } from "@/server/actions/collections";
import SingleProduct from "./singleProduct/singleProduct";
import { getTags } from "@/server/actions/tags";
import { Product } from "@/drizzle/schema";
import Image from "next/image";
import emptyState from "@/assets/empty-state.svg";
import EmptyState from "../../emptyState";

export default async function ProductList({
  products,
  showCollection,
}: {
  products: Array<Product>;
  showCollection?: boolean;
}) {
  const { collections } = await getCollections();
  const { tags } = await getTags();

  return (
    <section className="flex flex-col gap-6">
      <div className="w-full flex flex-col gap-6">
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
    </section>
  );
}
