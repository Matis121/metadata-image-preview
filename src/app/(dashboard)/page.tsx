import ListOfProducts from "@/components/products/list/listOfProducts";
import CollectionHeader from "@/components/collectionHeader";
import { getProducts } from "@/server/actions/products";
import { ProductForm } from "@/components/products/productForm";
import { Product } from "@/drizzle/schema";

export default async function Home() {
  const { products } = await getProducts();

  return (
    <div className="w-full flex flex-col gap-4">
      <ProductForm />
      <CollectionHeader headerName="All bookmarks" />
      <div className="px-4">
        <ListOfProducts products={products} showCollection={true} />
      </div>
    </div>
  );
}
