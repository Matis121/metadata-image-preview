import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductList from "./productViews/list/productList";
import ProductCard from "./productViews/card/productCard";
import {
  getProductUnsorted,
  getProductsFromCollection,
  getProducts,
  getProductsInTrash,
} from "@/server/actions/products";
import { getProductsByTag } from "@/server/actions/tags";
import EmptyState from "./emptyState";

export default async function ProductsView({
  fetchProductsType,
  fetchArgument,
  showCollection,
}: {
  fetchProductsType:
    | "getProductUnsorted"
    | "getProductsByTag"
    | "getProductsFromCollection"
    | "getProducts"
    | "getsProductsInTrash";
  fetchArgument?: any;
  showCollection?: boolean;
}) {
  let response;
  const isTrashPath = fetchProductsType === "getsProductsInTrash";

  switch (fetchProductsType) {
    case "getProductUnsorted":
      response = await getProductUnsorted();
      break;
    case "getProductsByTag":
      response = await getProductsByTag(fetchArgument);
      break;
    case "getProductsFromCollection":
      response = await getProductsFromCollection(fetchArgument);
      break;
    case "getProducts":
      response = await getProducts();
      break;
    case "getsProductsInTrash":
      response = await getProductsInTrash();
      break;
    default:
      throw new Error(`Invalid fetchProductsType: ${fetchProductsType}`);
  }

  const products = response.products;

  return (
    <div className="px-4">
      <Tabs defaultValue="list" className="w-full flex flex-col gap-6 -mt-12">
        <TabsList className="ml-auto">
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsTrigger value="card">Card</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <div className="flex flex-col gap-4">
            <ProductList products={products} showCollection={showCollection} />
            <EmptyState
              productsLength={products?.length}
              isTrashPath={isTrashPath}
            />
          </div>
        </TabsContent>
        <TabsContent value="card">
          <div className="flex flex-col gap-4">
            <ProductCard products={products} showCollection={showCollection} />
            <EmptyState
              productsLength={products?.length}
              isTrashPath={isTrashPath}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
