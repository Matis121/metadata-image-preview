import SignOutButton from "@/components/signOutButton";
import Collections from "./collections";
import MainSection from "./mainSection";
import Link from "next/link";
import { LuGlobe2 } from "react-icons/lu";

export default function Navigation() {
  return (
    <nav className="sticky top-0 h-[100vh] w-[380px] flex flex-col gap-4 py-3 text-xl font-semibold bg-white dark:bg-neutral-900 shadow-sm border-r dark:border-neutral-600">
      <a className="font-bold dark:text-neutral-300 px-4" href="/">
        QuickLinks
      </a>
      <div>
        <Link
          href="/"
          className={`dark:text-neutral-300 text-sm font-normal flex justify-between px-4 py-2 hover:dark:bg-neutral-800 `}
        >
          <div className="flex gap-2 items-center">
            <LuGlobe2 size={18} />
            <p>All bookmarks</p>
          </div>
        </Link>
        <MainSection />
      </div>
      <Collections />
      <div className="mt-auto">
        <SignOutButton />
      </div>
    </nav>
  );
}
