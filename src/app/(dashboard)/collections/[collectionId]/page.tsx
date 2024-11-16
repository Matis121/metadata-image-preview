import CollectionHeader from "@/components/collectionHeader";
import ListOfProducts from "@/components/products/list/ProductsList";
import { getSingleCollection } from "@/server/actions/collections";
import { getProductsFromCollection } from "@/server/actions/products";

export default async function Home({
  params,
}: {
  params: {
    collectionId: number;
  };
}) {
  const { collectionId } = await params;
  const { singleCollection }: any = await getSingleCollection(collectionId);
  const { products }: any = await getProductsFromCollection(collectionId);

  return (
    <div className="w-full flex flex-col gap-4">
      <CollectionHeader headerName={`Collection ${singleCollection.title}`} />
      <div className="px-4">
        <ListOfProducts products={products} />
      </div>
    </div>
  );
}
