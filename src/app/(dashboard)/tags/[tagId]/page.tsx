import CollectionHeader from "@/components/collectionHeader";
import PageTopSection from "@/components/pageTopSection";
import ProductsView from "@/components/products/productsView";
import { getSingleTag } from "@/server/actions/tags";
import { auth } from "@clerk/nextjs/server";

export default async function Tags({
  params,
}: {
  params: {
    tagId: number;
  };
}) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const { tagId } = await params;
  const singleTag = await getSingleTag(tagId);

  return (
    <div className="w-full flex flex-col gap-2">
      <PageTopSection clerkUserId={userId} collectionId={tagId} />
      <CollectionHeader
        headerName={`${singleTag !== undefined ? singleTag.name : ""}`}
        isTagHeader={true}
      />
      <ProductsView
        fetchProductsType="getProductsByTag"
        fetchArgument={tagId}
      />
    </div>
  );
}
