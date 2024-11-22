import ListOfProducts from "@/components/products/list/listOfProducts";
import CollectionHeader from "@/components/collectionHeader";
import { getProductsInTrash } from "@/server/actions/products";

export default async function Home() {
  const { products }: any = await getProductsInTrash();

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="mt-12">
        <CollectionHeader headerName="Trash" />
      </div>
      <div className="px-4">
        <ListOfProducts products={products} />
      </div>
    </div>
  );
}
