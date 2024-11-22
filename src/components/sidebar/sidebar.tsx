import SignOutButton from "@/components/signOutButton";
import Collections from "./collections";
import Defaults from "./defaults";

export default function Navigation() {
  return (
    <nav className="sticky top-0 h-[100vh] w-[380px] flex flex-col gap-4 py-3 text-xl font-semibold bg-white dark:bg-neutral-800 shadow-sm border-r dark:border-neutral-600">
      <a className="font-bold dark:text-neutral-300 px-4" href="/">
        QuickLinks
      </a>
      <div>
        <Defaults />
      </div>
      <Collections />
      <div className="mt-auto">
        <SignOutButton />
      </div>
    </nav>
  );
}
