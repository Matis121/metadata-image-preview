import CollectionHeader from "@/components/collectionHeader";
import ListOfProducts from "@/components/products/list/ProductsList";
import { getProductsFromCollection } from "@/server/actions/products";

export default async function Home({
  params,
}: {
  params: {
    collectionId: string;
  };
}) {
  const { collectionId } = await params;
  const { products }: any = await getProductsFromCollection(collectionId);

  return (
    <div className="w-full flex flex-col gap-4">
      <CollectionHeader headerName={`Collection ${collectionId}`} />
      <div className="px-4">
        <ListOfProducts products={products} />
      </div>
    </div>
  );
}
