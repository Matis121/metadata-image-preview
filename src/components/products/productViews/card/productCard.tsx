import { getCollections } from "@/server/actions/collections";
import SingleProduct from "../card/singleProduct/singleProduct";
import { getTags } from "@/server/actions/tags";
import { Product } from "@/drizzle/schema";
import Image from "next/image";
import emptyState from "@/assets/empty-state.svg";

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
    <section className="flex flex-col gap-6">
      <div className="w-full grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
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
      <div className="flex items-center justify-center text-neutral-400">
        {products?.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6">
            <Image
              alt="Product Image"
              width={300}
              height={300}
              src={emptyState}
            />
            <p>There is no products</p>
          </div>
        ) : (
          <p className="text-sm">
            {products?.length === 1
              ? "1 bookmark"
              : `${products.length} bookmarks`}
          </p>
        )}
      </div>
    </section>
  );
}
