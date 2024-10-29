"use client";

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

  return <Button onClick={() => handleSignOutClick()}>Log out</Button>;
}
