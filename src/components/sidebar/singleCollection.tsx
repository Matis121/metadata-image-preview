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

export default function SingleCollection({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [openDeleteForm, setOpenDeleteForm] = useState(false);

  return (
    <>
      <CollectionDeleteForm
        open={openDeleteForm}
        setOpen={setOpenDeleteForm}
        collectionId={id}
      />
      <Link
        href={`/collections/${id}`}
        className="cursor-pointer px-4 py-1 dark:text-neutral-300 text-[15px] flex items-center justify-between hover:dark:bg-neutral-800"
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
