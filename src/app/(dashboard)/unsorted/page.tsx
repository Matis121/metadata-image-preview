import ListOfProducts from "@/components/products/list/listOfProducts";
import CollectionHeader from "@/components/collectionHeader";
import { getProductUnsorted } from "@/server/actions/products";
import { auth } from "@clerk/nextjs/server";
import PageTopSection from "@/components/pageTopSection";
import CollectionSetEmoji from "@/components/collections/collectionSetEmoji";

export default async function Home() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const { products } = await getProductUnsorted();

  return (
    <div className="w-full flex flex-col gap-4">
      <PageTopSection clerkUserId={userId} />
      <CollectionHeader headerName="Unsorted" />
      <div className="px-4">
        <ListOfProducts products={products} />
      </div>
    </div>
  );
}
