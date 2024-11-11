import ListOfProducts from "@/components/products/listOfProducts";
import CollectionHeader from "@/components/collectionHeader";
import { getProductUnsorted } from "@/server/actions/products";

export default async function Home() {
  const { products }: any = await getProductUnsorted();

  return (
    <div className="w-full flex flex-col gap-4">
      <CollectionHeader headerName="Unsorted" />
      <div className="px-4">
        <ListOfProducts products={products} />
      </div>
    </div>
  );
}
