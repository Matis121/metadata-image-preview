import ListOfProducts from "@/components/products/productViews/list/productList";
import CollectionHeader from "@/components/collectionHeader";
import { getProductUnsorted } from "@/server/actions/products";
import { auth } from "@clerk/nextjs/server";
import PageTopSection from "@/components/pageTopSection";
import ProductsView from "@/components/products/productsView";

export default async function Home() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  return (
    <div className="w-full flex flex-col gap-4">
      <PageTopSection clerkUserId={userId} />
      <CollectionHeader headerName="Unsorted" />
      <ProductsView fetchProductsType="getProductUnsorted" />
    </div>
  );
}
