import CollectionHeader from "@/components/collectionHeader";
import ListOfProducts from "@/components/products/list/listOfProducts";
import { ProductForm } from "@/components/products/productForm";
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
  const singleCollection = await getSingleCollection(collectionId);
  const { products } = await getProductsFromCollection(collectionId);

  return (
    <div className="w-full flex flex-col gap-4">
      <ProductForm collectionId={collectionId} />
      <CollectionHeader
        headerName={`${singleCollection !== undefined ? singleCollection.title : ""}`}
      />
      <div className="px-4">
        <ListOfProducts products={products} />
      </div>
    </div>
  );
}
