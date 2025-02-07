import { SignOutButton } from "@clerk/nextjs";
import Collections from "./collections/collections";
import Tags from "./tags/tags";
import DefaultBookmarks from "./defaultBookmarks";
import { Button } from "../ui/button";

export default function Navigation() {
  return (
    <nav className="sticky top-0 h-[100vh] w-[380px] flex flex-col gap-4 py-3 text-xl font-semibold bg-white dark:bg-neutral-800 shadow-sm border-r dark:border-neutral-600">
      <a className="font-bold dark:text-neutral-300 px-4" href="/">
        QuickLinks
      </a>
      <div>
        <DefaultBookmarks />
      </div>
      <Collections />
      <Tags />
      <div className="mt-auto border-t border-neutral-600">
        <div className="mt-4 mx-4">
          <Button asChild variant="outline">
            <SignOutButton />
          </Button>
        </div>
      </div>
    </nav>
  );
}
