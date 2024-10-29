"use client";

import SubmitButton from "@/components/submitButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/auth-client";
import { useRef, useState } from "react";
import { z } from "zod";

export default function Home() {
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const UserSchema = z.object({
    name: z.string().min(4).max(25),
    email: z.string().email(),
    password: z.string(),
  });

  const handleSubmitForm = async (formData: FormData) => {
    const newUser = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    const validation = UserSchema.safeParse(newUser);
    if (!validation.success) {
      return setError("Invalid email or password");
    }
    const addNewUser = await signUp.email({
      email: newUser.email,
      password: newUser.password,
      name: newUser.name,
      callbackURL: "/",
    });
    if (addNewUser.error) {
      setError(`${addNewUser?.error.message}`);
      return;
    }
    formRef.current?.reset();
  };

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <h2>Register</h2>
      <form
        ref={formRef}
        className="flex flex-col gap-4 max-w-[280px] w-full"
        action={handleSubmitForm}
      >
        <div className="flex flex-col">
          <label className="text-neutral-700 text-sm" htmlFor="name">
            Name
          </label>
          <Input type="text" name="name" id="name" />
        </div>
        <div className="flex flex-col">
          <label className="text-neutral-700 text-sm" htmlFor="email">
            Email
          </label>
          <Input type="text" name="email" id="email" />
        </div>
        <div className="flex flex-col">
          <label className="text-neutral-700 text-sm" htmlFor="password">
            Password
          </label>
          <Input type="password" name="password" id="password" />
        </div>
        <SubmitButton buttonValue="Create new account" />
        <p className="mt-4 text-red-400 text-center">{error}</p>
      </form>
    </div>
  );
}
