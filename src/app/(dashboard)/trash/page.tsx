import ListOfProducts from "@/components/products/productViews/list/productList";
import CollectionHeader from "@/components/collectionHeader";
import { getProductsInTrash } from "@/server/actions/products";
import { auth } from "@clerk/nextjs/server";
import PageTopSection from "@/components/pageTopSection";
import ProductsView from "@/components/products/productsView";

export default async function Home() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  return (
    <div className="w-full flex flex-col gap-2">
      <PageTopSection clerkUserId={userId} isProductFormActive={false} />
      <CollectionHeader headerName="Trash" />
      <ProductsView fetchProductsType="getsProductsInTrash" />
    </div>
  );
}
