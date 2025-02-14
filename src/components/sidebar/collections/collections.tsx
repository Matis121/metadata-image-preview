import {
  getCollections,
  getCollectionsWithCount,
} from "@/server/actions/collections";
import CollectionForm from "../../collections/collectionForm";
import SingleCollection from "./singleCollection";
import { auth } from "@clerk/nextjs/server";

type Collection = {
  id: number;
  title: string;
  description?: string | null;
  productCount: number;
  emoji?: string | null;
};

export default async function Collections() {
  const { userId } = await auth();
  if (!userId) {
    return;
  }
  const { collections } = await getCollectionsWithCount();

  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex justify-between w-full mb-1">
        <span className="px-4 py-1 dark:text-neutral-500 text-sm font-normal">
          Collections
        </span>
        <CollectionForm clerkUserId={userId} />
      </div>
      <div className="scrollbar-hide flex flex-col text-white w-full">
        {collections?.length > 0 &&
          collections.map((collection: Collection) => (
            <SingleCollection
              count={collection.productCount}
              id={collection.id}
              title={collection.title}
              key={collection.id}
              emoji={collection.emoji}
            />
          ))}
      </div>
    </div>
  );
}
