import { getCollections } from "@/server/actions/collections";
import AddCollectionButton from "../collections/collectionForm";
import SingleCollection from "./singleCollection";

export default async function Collections() {
  const { collections }: any = await getCollections();

  return (
    <div className="flex flex-col items-start w-full">
      <span className="px-4 py-1 dark:text-neutral-500 text-sm font-normal">
        Collections
      </span>
      <div className="flex flex-col text-white w-full">
        {collections &&
          collections.length > 0 &&
          collections.map((element: any) => (
            <SingleCollection
              id={element.id}
              title={element.title}
              key={element.id}
            />
          ))}
      </div>
      <AddCollectionButton />
    </div>
  );
}
