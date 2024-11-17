"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuFolder } from "react-icons/lu";
import { LuMoreHorizontal } from "react-icons/lu";
import CollectionDeleteForm from "../collections/collectionDeleteForm";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SingleCollection({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [openDeleteForm, setOpenDeleteForm] = useState(false);
  const pathName = usePathname();
  const isActive = pathName.startsWith("/collections/" + id);

  return (
    <>
      <CollectionDeleteForm
        open={openDeleteForm}
        setOpen={setOpenDeleteForm}
        collectionId={id}
      />
      <Link
        href={`/collections/${id}`}
        className={`cursor-pointer px-4 py-2 dark:text-neutral-300 text-sm font-normal flex items-center justify-between hover:dark:bg-neutral-800 ${isActive && "dark:bg-neutral-800"}`}
        key={id}
      >
        <div className="flex items-center gap-2">
          <LuFolder />
          {title}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <LuMoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Rename</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenDeleteForm(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Link>
    </>
  );
}
