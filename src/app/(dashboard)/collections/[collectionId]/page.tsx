import CollectionHeader from "@/components/collectionHeader";
import PageTopSection from "@/components/pageTopSection";
import ProductsView from "@/components/products/productsView";
import { getSingleCollection } from "@/server/actions/collections";
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

  if (!singleCollection) {
    return;
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <PageTopSection clerkUserId={userId} collectionId={collectionId} />
      <CollectionHeader
        headerName={singleCollection.title}
        emoji={singleCollection.emoji}
      />
      <ProductsView
        fetchProductsType="getProductsFromCollection"
        fetchArgument={collectionId}
      />
    </div>
  );
}
