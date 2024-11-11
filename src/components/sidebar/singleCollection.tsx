"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteCollection } from "@/server/actions/collections";
import { LuFolder } from "react-icons/lu";
import { LuMoreHorizontal } from "react-icons/lu";
import { Button } from "../ui/button";
import CollectionDeleteForm from "../collections/collectionDeleteForm";
import { useState } from "react";

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
      <div
        className="cursor-pointer px-4 py-1 dark:text-neutral-300 text-[15px] flex items-center justify-between hover:dark:bg-neutral-800"
        key={id}
      >
        <div className="flex items-center gap-2">
          <LuFolder />
          {title}
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost">
                <LuMoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Rename</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenDeleteForm(true)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
