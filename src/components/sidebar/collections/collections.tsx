import { getCollections } from "@/server/actions/collections";
import CollectionForm from "../../collections/collectionForm";
import SingleCollection from "./singleCollection";
import { Collection } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";

export default async function Collections() {
  const { userId } = await auth();
  if (!userId) {
    return;
  }
  const { collections } = await getCollections();

  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex justify-between w-full mb-1">
        <span className="px-4 py-1 dark:text-neutral-500 text-sm font-normal">
          Collections
        </span>
        <CollectionForm clerkUserId={userId} />
      </div>
      <div className="flex flex-col text-white w-full">
        {collections?.length > 0 &&
          collections.map((collection: Collection) => (
            <SingleCollection
              id={collection.id}
              title={collection.title}
              key={collection.id}
            />
          ))}
      </div>
    </div>
  );
}
