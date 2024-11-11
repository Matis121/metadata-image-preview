import CollectionHeader from "@/components/collectionHeader";
import ListOfProducts from "@/components/products/listOfProducts";
import { getProductsFromCollection } from "@/server/actions/products";

export default async function Home({
  params,
}: {
  params: {
    collectionId: string;
  };
}) {
  const { products }: any = await getProductsFromCollection(
    params.collectionId
  );

  return (
    <div className="w-full flex flex-col gap-4">
      <CollectionHeader headerName={`Collection ${params.collectionId}`} />
      <div className="px-4">
        <ListOfProducts products={products} />
      </div>
    </div>
  );
}
