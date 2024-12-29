import CollectionHeader from "@/components/collectionHeader";
import ListOfProducts from "@/components/products/list/listOfProducts";
import { ProductForm } from "@/components/products/productForm";
import { getProductsByTag, getSingleTag } from "@/server/actions/tags";

export default async function Tags({
  params,
}: {
  params: {
    tagId: number;
  };
}) {
  const { tagId } = await params;
  const { singleCollection }: any = await getSingleTag(tagId);
  const { products }: any = await getProductsByTag(tagId);

  return (
    <div className="w-full flex flex-col gap-4">
      <ProductForm collectionId={tagId} />
      <CollectionHeader
        headerName={`${singleCollection !== undefined ? singleCollection.name : ""}`}
      />
      <div className="px-4">
        <ListOfProducts products={products} />
      </div>
    </div>
  );
}
