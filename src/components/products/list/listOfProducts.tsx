import { getCollections } from "@/server/actions/collections";
import SingleProduct from "../singleProduct/singleProduct";
import { getTags } from "@/server/actions/tags";

export default async function ListOfProducts({
  products,
  showCollection,
}: {
  products: Array<Product>;
  showCollection?: boolean;
}) {
  const { collections }: any = await getCollections();
  const { tags } = await getTags();

  return (
    <section className="flex flex-col gap-6">
      <div className="w-full grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((singleProduct: any) => (
          <SingleProduct
            collections={collections}
            tags={tags}
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
