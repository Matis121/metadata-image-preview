"use client";

import { deleteCollection } from "@/server/actions/collections";
import { LuFolder } from "react-icons/lu";

export default function SingleCollection({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  return (
    <div
      onClick={async () => await deleteCollection(id)}
      className="cursor-pointer px-4 py-1 dark:text-neutral-300 text-[15px] flex items-center gap-2 hover:dark:bg-neutral-800"
      key={id}
    >
      <LuFolder />
      {title}
    </div>
  );
}
