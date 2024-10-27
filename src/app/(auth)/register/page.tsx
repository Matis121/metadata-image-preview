"use client";

import { Button } from "@/components/ui/button";
import { signUp } from "@/lib/auth-client";

export default async function Home() {
  return (
    <div className="w-full flex flex-col items-center gap-20">
      <Button
        onClick={async () => {
          await signUp.email({
            email: "test@example.com",
            password: "password1234",
            name: "test",
            image: "https://example.com/image.png",
            callbackURL: "/",
          });
        }}
      >
        Register
      </Button>
    </div>
  );
}
