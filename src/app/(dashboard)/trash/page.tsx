import ListOfProducts from "@/components/products/list/listOfProducts";
import CollectionHeader from "@/components/collectionHeader";
import { getProductsInTrash } from "@/server/actions/products";
import { auth } from "@clerk/nextjs/server";
import PageTopSection from "@/components/pageTopSection";

export default async function Home() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const { products } = await getProductsInTrash();

  return (
    <div className="w-full flex flex-col gap-4">
      <PageTopSection clerkUserId={userId} isProductFormActive={false} />
      <CollectionHeader headerName="Trash" />
      <div className="px-4">
        <ListOfProducts products={products} />
      </div>
    </div>
  );
}
