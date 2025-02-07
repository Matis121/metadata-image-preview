import CollectionHeader from "@/components/collectionHeader";
import PageTopSection from "@/components/pageTopSection";
import ListOfProducts from "@/components/products/list/listOfProducts";
import { ProductForm } from "@/components/products/productForm";
import { getSingleCollection } from "@/server/actions/collections";
import { getProductsFromCollection } from "@/server/actions/products";
import { auth } from "@clerk/nextjs/server";

export default async function Home({
  params,
}: {
  params: {
    collectionId: number;
  };
}) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const { collectionId } = await params;
  const singleCollection = await getSingleCollection(collectionId);
  const { products } = await getProductsFromCollection(collectionId);

  return (
    <div className="w-full flex flex-col gap-4">
      <PageTopSection clerkUserId={userId} collectionId={collectionId} />
      <CollectionHeader
        headerName={`${singleCollection !== undefined ? singleCollection.title : ""}`}
      />
      <div className="px-4">
        <ListOfProducts products={products} />
      </div>
    </div>
  );
}
