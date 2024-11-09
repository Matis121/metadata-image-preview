import { getCollections } from "@/server/actions/collections";
import AddCollectionButton from "./addCollectionButton";
import { LuFolder } from "react-icons/lu";

export default async function Collections() {
  const { collections }: any = await getCollections();

  return (
    <div className="flex flex-col items-start w-full">
      <span className="px-4 py-1 dark:text-neutral-500 text-sm font-normal">
        <button>Collections</button>
      </span>
      <div className="flex flex-col text-white w-full">
        {collections && collections.length > 0 ? (
          collections.map((element: any) => (
            <div
              className="cursor-pointer px-4 py-1 dark:text-neutral-300 text-[15px] flex items-center gap-2 hover:dark:bg-neutral-800"
              key={element.id}
            >
              <LuFolder />
              {element.title}
            </div>
          ))
        ) : (
          <p>No collections found.</p>
        )}
      </div>
      <AddCollectionButton />
    </div>
  );
}
