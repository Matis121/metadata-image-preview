import { getCollections } from "@/server/actions/collections";
import SingleProduct from "./singleProduct";

export default async function ListOfProducts({
  products,
  showCollection,
}: {
  products: Array<T>;
  showCollection?: boolean;
}) {
  const { collections }: any = await getCollections();

  return (
    <section className="flex flex-col gap-6">
      <div className="w-full grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((singleProduct: any) => (
          <SingleProduct
            collections={collections}
            singleProduct={singleProduct}
            key={singleProduct.id}
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
