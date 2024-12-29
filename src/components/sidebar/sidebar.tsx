import SignOutButton from "@/components/signOutButton";
import Collections from "./collections";
import Defaults from "./defaults";
import TagForm from "../tags/tagForm";
import { getTags } from "@/server/actions/tags";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuMoreHorizontal } from "react-icons/lu";
import TagDeleteForm from "../tags/tagDeleteForm";
import SingleTag from "./singleTag";

export default async function Navigation() {
  const { tags } = await getTags();

  return (
    <nav className="sticky top-0 h-[100vh] w-[380px] flex flex-col gap-4 py-3 text-xl font-semibold bg-white dark:bg-neutral-800 shadow-sm border-r dark:border-neutral-600">
      <a className="font-bold dark:text-neutral-300 px-4" href="/">
        QuickLinks
      </a>
      <div>
        <Defaults />
      </div>
      <Collections />
      <div className="flex flex-col items-start w-full">
        <div className="flex justify-between w-full mb-1">
          <span className="px-4 py-1 dark:text-neutral-500 text-sm font-normal">
            Tags
          </span>
          <TagForm />
        </div>
        <div className="flex flex-col text-white w-full">
          {tags?.map((tag) => (
            <SingleTag id={tag.id.toString()} title={tag.name} key={tag.id} />
          ))}
        </div>
      </div>
      <div className="mt-auto border-t border-neutral-600">
        <div className="mt-4">
          <SignOutButton />
        </div>
      </div>
    </nav>
  );
}
