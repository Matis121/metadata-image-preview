import ListOfProducts from "@/components/products/list/ProductsList";
import CollectionHeader from "@/components/collectionHeader";
import { getProducts } from "@/server/actions/products";

export default async function Home() {
  const { products }: any = await getProducts();

  return (
    <div className="w-full flex flex-col gap-4">
      <CollectionHeader headerName="All bookmarks" />
      <div className="px-4">
        <ListOfProducts products={products} />
      </div>
    </div>
  );
}
