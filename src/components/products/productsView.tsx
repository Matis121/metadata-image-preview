import { DataTable } from "@/components/products/dataList/dataTable";
import { columns } from "@/components/products/dataList/column";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ListOfProducts from "./list/listOfProducts";
import {
  getProductUnsorted,
  getProductsFromCollection,
  getProducts,
  getProductsInTrash,
} from "@/server/actions/products";
import { getProductsByTag } from "@/server/actions/tags";

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
      <Tabs defaultValue="grid" className="w-full flex flex-col gap-6 -mt-12">
        <TabsList className="ml-auto">
          <TabsTrigger value="grid">Cards</TabsTrigger>
          <TabsTrigger value="table">Table</TabsTrigger>
        </TabsList>
        <TabsContent value="grid">
          <ListOfProducts products={products} showCollection={showCollection} />
        </TabsContent>
        <TabsContent value="table">
          <DataTable columns={columns} data={products} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
