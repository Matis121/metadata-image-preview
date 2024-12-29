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
import CollectionEditForm from "../collections/collectionEditForm";
import TagDeleteForm from "../tags/tagDeleteForm";
import TagEditForm from "../tags/tagEditForm";

export default function SingleTag({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [openDeleteForm, setOpenDeleteForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const pathName = usePathname();
  const isActive = pathName.startsWith("/tags/" + id);

  return (
    <>
      <TagEditForm
        open={openEditForm}
        setOpen={setOpenEditForm}
        tagId={id}
        tagTitle={title}
      />
      <TagDeleteForm
        open={openDeleteForm}
        setOpen={setOpenDeleteForm}
        tagId={id}
      />
      <Link
        href={`/tags/${id}`}
        key={id}
        className={`relative group cursor-pointer px-4 py-1 dark:text-neutral-300 text-sm font-normal flex items-center gap-2 hover:dark:bg-neutral-900 ${
          isActive && "dark:bg-neutral-900"
        }`}
      >
        <div className="flex gap-2">
          <span>#</span>
          {title}
        </div>
        <div className="invisible absolute right-4 top-1.5 group-hover:visible">
          <DropdownMenu>
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
