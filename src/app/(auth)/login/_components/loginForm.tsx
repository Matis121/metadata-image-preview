"use client";

import SubmitButton from "@/components/submitButton";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";
import { useRef, useState } from "react";
import { z } from "zod";

export default function LoginForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState("");

  const ProductSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const handleSubmitForm = async (formData: FormData) => {
    const loginUser = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    const result = ProductSchema.safeParse(loginUser);
    if (!result.success) {
      setError("Invalid email or password");
      return;
    }

    const checkout = await signIn.email({
      email: loginUser.email,
      password: loginUser.password,
      callbackURL: "/",
    });
    if (checkout.error) {
      setError(`${checkout?.error.message}`);
      return;
    }
    formRef.current?.reset();
  };

  return (
    <form
      ref={formRef}
      className="flex flex-col gap-4 max-w-[280px] w-full"
      action={handleSubmitForm}
    >
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
      <SubmitButton />
      <p className="mt-4 text-red-400 text-center">{error}</p>
    </form>
  );
}
