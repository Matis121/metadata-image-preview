"use client";
import { LuLogOut } from "react-icons/lu";

import { signOut } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOutClick = async () => {
    try {
      const handleSignOut = await signOut();
      if (handleSignOut?.data?.success) {
        router.push("/login");
      }
    } catch {
      console.error("Unable to redirect on sign-out");
    }
  };

  return (
    <Button
      className="dark:text-neutral-200"
      variant={"ghost"}
      onClick={() => handleSignOutClick()}
    >
      <LuLogOut />
      Log out
    </Button>
  );
}
