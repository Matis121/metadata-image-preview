"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuFolder } from "react-icons/lu";
import { LuMoreHorizontal } from "react-icons/lu";
import CollectionDeleteForm from "../../collections/collectionDeleteForm";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CollectionEditForm from "../../collections/collectionEditForm";

export default function SingleCollection({
  id,
  title,
  count,
}: {
  id: number;
  title: string;
  count: number;
}) {
  const [openDeleteForm, setOpenDeleteForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathName = usePathname();
  const isActive = pathName.startsWith("/collections/" + id);

  return (
    <>
      <CollectionDeleteForm
        open={openDeleteForm}
        setOpen={setOpenDeleteForm}
        collectionId={id}
      />
      <CollectionEditForm
        open={openEditForm}
        setOpen={setOpenEditForm}
        isDropdownOpen={isDropdownOpen}
        collectionId={id}
        collectionTitle={title}
      />

      <Link
        href={`/collections/${id}`}
        className={`group relative cursor-pointer px-4 py-1 dark:text-neutral-300 text-sm font-normal flex items-center justify-between hover:dark:bg-neutral-900 ${
          isActive && "dark:bg-neutral-900"
        }`}
        key={id}
      >
        <div className="flex items-center gap-2">
          <LuFolder />
          {title}
        </div>
        <div className="flex items-center justify-center px-1 min-w-4">
          {count}
        </div>
        <div className="invisible absolute border bg-neutral-600 hover:bg-neutral-700 rounded-md right-3 top-0.5 flex items-center justify-center p-1 group-hover:visible">
          <DropdownMenu onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger>
              <LuMoreHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenEditForm(true);
                }}
              >
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDeleteForm(true);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Link>
    </>
  );
}
