import { getCollections } from "@/server/actions/collections";
import SingleProduct from "../singleProduct/singleProduct";
import { getTags } from "@/server/actions/tags";
import { Product } from "@/drizzle/schema";

export default async function ListOfProducts({
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
        <p>{products?.length} bookmarks</p>
      </div>
    </section>
  );
}
