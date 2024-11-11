import SignOutButton from "@/components/signOutButton";
import { LuTrash2 } from "react-icons/lu";
import { LuGlobe2 } from "react-icons/lu";
import { LuShapes } from "react-icons/lu";
import Collections from "./collections";
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="sticky top-0 h-[100vh] w-[380px] flex flex-col gap-4 py-3 text-xl font-semibold bg-white dark:bg-neutral-900 shadow-sm border-r dark:border-neutral-600">
      <a className="font-bold dark:text-neutral-300 px-4" href="/">
        QuickLinks
      </a>
      <div className="flex flex-col">
        <Link
          href="/"
          className="dark:text-neutral-300 text-[15px] flex justify-between px-4 py-1 hover:dark:bg-neutral-800"
        >
          <div className="flex gap-2 items-center">
            <LuGlobe2 size={18} />
            <p>All bookmarks</p>
          </div>
        </Link>
        <Link
          href="/unsorted"
          className="dark:text-neutral-300 text-[15px] flex justify-between px-4 py-1 hover:dark:bg-neutral-800"
        >
          <div className="flex gap-2 items-center">
            <LuShapes size={18} />
            <p>Unsorted</p>
          </div>
        </Link>
        <Link
          href="/trash"
          className="dark:text-neutral-300 text-[15px] flex justify-between px-4 py-1 hover:dark:bg-neutral-800"
        >
          <div className="flex gap-2 items-center">
            <LuTrash2 size={18} />
            <p>Trash</p>
          </div>
        </Link>
      </div>
      <div className="flex flex-col">
        <Collections />
      </div>
      <div className="mt-auto">
        <SignOutButton />
      </div>
    </nav>
  );
}
