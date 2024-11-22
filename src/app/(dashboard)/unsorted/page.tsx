import ListOfProducts from "@/components/products/list/listOfProducts";
import CollectionHeader from "@/components/collectionHeader";
import { getProductUnsorted } from "@/server/actions/products";
import { ProductForm } from "@/components/products/productForm";

export default async function Home() {
  const { products }: any = await getProductUnsorted();

  return (
    <div className="w-full flex flex-col gap-4">
      <ProductForm />
      <CollectionHeader headerName="Unsorted" />
      <div className="px-4">
        <ListOfProducts products={products} />
      </div>
    </div>
  );
}
