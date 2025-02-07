import ListOfProducts from "@/components/products/list/listOfProducts";
import CollectionHeader from "@/components/collectionHeader";
import { getProducts } from "@/server/actions/products";
import { ProductForm } from "@/components/products/productForm";
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import PageTopSection from "@/components/pageTopSection";

export default async function Home() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const { products } = await getProducts();

  return (
    <div className="w-full flex flex-col gap-4">
      <PageTopSection clerkUserId={userId} />
      <CollectionHeader headerName="All bookmarks" />
      <div className="px-4">
        <ListOfProducts products={products} showCollection={true} />
      </div>
    </div>
  );
}
