import { SignOutButton } from "@clerk/nextjs";
import Collections from "./collections/collections";
import Tags from "./tags/tags";
import DefaultBookmarks from "./defaultBookmarks";
import { Button } from "../ui/button";

export default function Navigation() {
  return (
    <nav className="sticky top-0 h-[100vh] w-[380px] flex flex-col text-xl font-semibold bg-white dark:bg-neutral-800 shadow-sm border-r dark:border-neutral-600">
      <a
        className="font-bold dark:text-neutral-300 px-4 py-3.5 mb-[10px]"
        href="/"
      >
        QuickLinks
      </a>
      <div className="border-t border-b border-neutral-600 py-2">
        <DefaultBookmarks />
      </div>
      <div className="scrollbar-hide h-full overflow-y-scroll flex flex-col gap-4 pb-6 pt-2">
        <Collections />
        <Tags />
      </div>
    </nav>
  );
}
