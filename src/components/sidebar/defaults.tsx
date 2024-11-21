"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuTrash2 } from "react-icons/lu";
import { LuGlobe2 } from "react-icons/lu";
import { LuShapes } from "react-icons/lu";

export default function Defaults() {
  const navLinks = [
    { name: "All bookmarks", href: "/", icon: <LuGlobe2 size={18} /> },
    { name: "Unsorted", href: "/unsorted", icon: <LuShapes size={18} /> },
    { name: "Trash", href: "/trash", icon: <LuTrash2 size={18} /> },
  ];
  const pathname = usePathname();

  return (
    <div className="flex flex-col">
      {navLinks.map((link, idx) => {
        const isActive =
          link.href === "/"
            ? pathname === link.href
            : pathname.startsWith(link.href);
        return (
          <Link
            key={idx}
            href={link.href}
            className={`dark:text-neutral-300 text-sm font-normal flex justify-between px-4 py-2 hover:dark:bg-neutral-900 ${isActive && "dark:bg-neutral-900"}`}
          >
            <div className="flex gap-2 items-center">
              {link.icon}
              {link.name}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
