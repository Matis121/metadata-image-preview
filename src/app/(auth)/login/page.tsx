"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";

export default async function Home() {
  return (
    <div className="w-full flex flex-col items-center gap-10">
      <h2>Login to app</h2>
      <Button
        onClick={async () => {
          await signIn.email({
            email: "test@example.com",
            password: "password1234",
            callbackURL: "/",
          });
        }}
      >
        Login to account
      </Button>
    </div>
  );
}
