import ListOfProducts from "@/components/products/listOfProducts";
import CollectionHeader from "@/components/collectionHeader";

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-4">
      <CollectionHeader headerName="All bookmarks" />
      <div className="px-4">
        <ListOfProducts />
      </div>
    </div>
  );
}
