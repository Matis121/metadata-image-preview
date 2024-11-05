import { ListOfProducts } from "@/app/products/_components/listOfProducts";
import CollectionHeader from "@/components/collectionHeader";

export default async function Home() {
  return (
    <div className="w-full flex flex-col gap-4">
      <CollectionHeader headerName="All bookmarks" />
      <div className="px-4">
        <ListOfProducts />
      </div>
    </div>
  );
}
