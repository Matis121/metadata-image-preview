"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/auth-client";

export default async function Home() {
  return (
    <div className="w-full flex flex-col items-center gap-8">
      <h2>Create an account</h2>
      <form action="">
        <Input type="text" name="email" />
        <Input type="text" name="password" />
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
      </form>
    </div>
  );
}
